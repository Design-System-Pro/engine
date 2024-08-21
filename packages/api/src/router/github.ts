import { createTRPCRouter, protectedProcedure } from '../trpc';
import { getInstallationOctokit } from '@ds-project/services/github';
import { getRef } from '../../../services/src/github/utils/get-ref';
import type { DesignTokens } from 'style-dictionary/types';
import { selectGithubIntegration } from '../queries/integrations';

export const githubRouter = createTRPCRouter({
  tokens: protectedProcedure.query(async ({ ctx }) => {
    const githubIntegration = await selectGithubIntegration({ ctx });

    if (!githubIntegration) {
      throw new Error('No GitHub integration found');
    }

    const octokit = await getInstallationOctokit(
      githubIntegration.data.installationId
    );

    const repositories = await octokit.request(
      'GET /installation/repositories'
    );

    const repository = repositories.data.repositories.find(
      (_repository) => _repository.id === githubIntegration.data.repositoryId
    );

    if (!repository) throw new Error('No repository found');

    const ref = await getRef({
      targetBranchName: 'ds-project/sync-tokens',
      baseBranchName: 'main',
      octokit: octokit,
      owner: repository.owner.login,
      repo: repository.name,
    });

    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: repository.owner.login,
        repo: repository.name,
        path: `packages/generator/tokens/tokens.json`,
        ref,
      }
    );

    if ('type' in response.data) {
      if (response.data.type !== 'file') {
        throw new Error('No tokens file found');
      }

      return response.data.encoding === 'base64'
        ? (JSON.parse(
            Buffer.from(response.data.content, 'base64').toString()
          ) as DesignTokens)
        : (JSON.parse(response.data.content) as DesignTokens);
    }
  }),
});
