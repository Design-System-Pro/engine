'use server';

import type { DesignTokens } from 'style-dictionary/types';
import type { Octokit } from '@octokit/core';
import type { RequestError } from '@octokit/types';

import { config } from '@/config';
import { api } from '@ds-project/api/rsc';
import { getInstallationOctokit } from '@ds-project/services/github';

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
  try {
    const githubIntegration = await api.integrations.github();

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
      branchName: 'ds-project/sync-tokens',
      mainBranch: 'main',
      octokit: octokit,
      owner: repository.owner.login,
      repo: repository.name,
    });

    const response = await octokit.request(
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
    console.error('Error requesting tokens', error);
    return null;
  }
}
