import { getInstallationOctokit, pushFile } from '@ds-project/services/github';
import { selectGithubIntegration } from '../queries/integrations';
import type { DSContext } from '../types/context';
import type { DesignTokensModel } from '@ds-project/database/schema';

export async function release({
  ctx,
  designTokens,
}: {
  ctx: DSContext;
  designTokens: DesignTokensModel | null;
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
  });
}
