'use server';

import type { Octokit } from '@octokit/core';
import type { RequestError } from '@octokit/types';

import { getInstallationOctokit } from '../octokit';

async function getRef({
  targetBranchName: targetBranchName,
  baseBranchName: baseBranchName,
  octokit,
  owner,
  repo,
}: {
  baseBranchName: string;
  targetBranchName: string;
  octokit: Octokit;
  owner: string;
  repo: string;
}) {
  // Check if the branch exists
  try {
    await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
      owner,
      repo,
      ref: `heads/${targetBranchName}`,
    });

    // If the branch exists, use it
    return targetBranchName;
  } catch (error) {
    if ((error as RequestError).status !== 404) {
      throw error; // Re-throw if it's not a 404 error
    }
    // If the branch does not exist, default to the main branch
    return baseBranchName;
  }
}

export async function getFile<T>({
  installationId,
  owner,
  repo,
  baseBranchName = 'main',
  targetBranchName = 'ds-project/sync-tokens',
  path,
}: {
  installationId: number;
  owner: string;
  repo: string;
  targetBranchName: string;
  baseBranchName: string;
  path: string;
}) {
  try {
    const octokit = await getInstallationOctokit(installationId);

    const ref = await getRef({
      targetBranchName,
      baseBranchName,
      octokit,
      owner,
      repo,
    });

    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: owner,
        repo: repo,
        path,
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
          ) as T)
        : (JSON.parse(response.data.content) as T);
    }
  } catch (error) {
    console.error('Error requesting tokens', error);
    return null;
  }
}
