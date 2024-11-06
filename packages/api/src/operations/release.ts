import { getInstallationOctokit, pushFile } from '@ds-project/services/github';
import { selectGithubIntegration } from '../queries/integrations';
import type { BaseContext } from '../types/context';
import type { JSONTokenTree } from 'design-tokens-format-module';

export async function release({
  ctx,
  designTokens,
}: {
  ctx: BaseContext;
  designTokens: JSONTokenTree | null;
}) {
  const githubIntegration = await selectGithubIntegration({ ctx });

  if (!githubIntegration) {
    console.log('No GitHub integration found. Skipping release.');
    return;
  }

  const octokit = await getInstallationOctokit(
    githubIntegration.data.installationId
  );

  const repositories = await octokit.request('GET /installation/repositories');
  const repository = repositories.data.repositories.find(
    (_repository) => _repository.id === githubIntegration.data.repositoryId
  );

  if (!repository) {
    console.log('No repository found. Skipping release.');
    return;
  }

  const content = btoa(JSON.stringify(designTokens, null, 2));

  await pushFile({
    file: {
      content,
      encoding: 'base64',
      name: 'tokens.json',
      path: githubIntegration.data.tokensPath,
    },
    installationId: githubIntegration.data.installationId,
    owner: repository.owner.login,
    repo: repository.name,
    targetBranchName: githubIntegration.data.targetGitBranch,
    defaultBranchName: 'main',
    commitMessage: githubIntegration.data.commitMessage,
  });
}
