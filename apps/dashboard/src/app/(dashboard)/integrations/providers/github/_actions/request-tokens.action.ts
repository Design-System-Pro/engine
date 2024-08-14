'use server';

import type { DesignTokens } from 'style-dictionary/types';
import type { Octokit } from '@octokit/core';
import type { RequestError } from '@octokit/types';
import {
  getGithubInstallation,
  getGithubIntegration,
  getGithubRepository,
} from '@/lib/github';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { config } from '@/config';

async function getRef({
  branchName,
  mainBranch,
  octokit,
  owner,
  repo,
}: {
  mainBranch: string;
  branchName: string;
  octokit: Octokit;
  owner: string;
  repo: string;
}) {
  // Check if the branch exists
  try {
    await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
      owner,
      repo,
      ref: `heads/${branchName}`,
    });

    // If the branch exists, use it
    return branchName;
  } catch (error) {
    if ((error as RequestError).status !== 404) {
      throw error; // Re-throw if it's not a 404 error
    }
    // If the branch does not exist, default to the main branch
    return mainBranch;
  }
}

export async function requestTokens() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  try {
    const githubIntegration = await getGithubIntegration();
    const repository = await getGithubRepository();
    const installation = await getGithubInstallation(githubIntegration);

    const ref = await getRef({
      branchName: 'ds-project/sync-tokens',
      mainBranch: 'main',
      octokit: installation,
      owner: repository.owner.login,
      repo: repository.name,
    });

    const response = await installation.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: repository.owner.login,
        repo: repository.name,
        path: `${config.gitTokensPath}/tokens.json`,
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
  } catch (error) {
    // eslint-disable-next-line no-console --  TODO: replace with monitoring
    console.error('Error requesting tokens', error);
    return null;
  }
}
