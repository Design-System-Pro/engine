import 'server-only';

import type { RequestError } from '@octokit/types';
import type { Octokit } from '@octokit/core';
import { getInstallationOctokit } from '../octokit';

async function getBaseCommitSha({
  octokit,
  targetBranchName,
  baseBranchName,
  repo,
  owner,
}: {
  octokit: Octokit;
  targetBranchName: string;
  baseBranchName: string;
  repo: string;
  owner: string;
}) {
  try {
    // Try to get the head SHA of the feature branch if it exists
    const {
      data: {
        object: { sha: branchSha },
      },
    } = await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
      ref: `heads/${targetBranchName}`,
      repo,
      owner,
    });

    return branchSha; // return the base SHA to the head of the existing branch
  } catch (error: unknown) {
    if ((error as RequestError).status === 404) {
      // If the branch does not exist, use the main branch as the base
      const {
        data: {
          object: { sha: mainSha },
        },
      } = await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
        ref: `heads/${baseBranchName}`,
        repo,
        owner,
      });

      // Create a new branch from the main branch
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        ref: `refs/heads/${targetBranchName}`,
        sha: mainSha,
        owner,
        repo,
      });

      return mainSha;
    }

    throw new Error('Error getting base commit SHA');
  }
}

export async function pushFile({
  file,
  owner,
  repo,
  installationId,
  targetBranchName = 'ds-project/sync-tokens',
  baseBranchName = 'main',
}: {
  file: {
    encoding: 'utf-8' | 'base64';
    content: string;
    name: string;
    path?: string;
  };
  owner: string;
  repo: string;
  installationId: number;
  targetBranchName?: string;
  baseBranchName?: string;
}) {
  const octokit = await getInstallationOctokit(installationId);

  const baseCommitSha = await getBaseCommitSha({
    targetBranchName,
    baseBranchName,
    owner,
    repo,
    octokit,
  });

  // create a new blob
  const {
    data: { sha: blobSha },
  } = await octokit.request('POST /repos/{owner}/{repo}/git/blobs', {
    content: file.content,
    encoding: file.encoding,
    owner,
    repo,
  });

  // create a new tree
  const {
    data: { sha: treeSha },
  } = await octokit.request('POST /repos/{owner}/{repo}/git/trees', {
    base_tree: baseCommitSha,
    tree: [
      {
        path: `${file.path ?? ''}/${file.name}`,
        mode: '100644',
        type: 'blob',
        sha: blobSha,
      },
    ],
    owner,
    repo,
  });

  // create a new commit
  const {
    data: { sha: commitSha },
  } = await octokit.request('POST /repos/{owner}/{repo}/git/commits', {
    message: '[ds-project] 💅 Sync Tokens',
    tree: treeSha,
    parents: [baseCommitSha],
    owner,
    repo,
  });

  // update the branch with the new commit
  await octokit.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
    ref: `heads/${targetBranchName}`,
    sha: commitSha,
    owner,
    repo,
  });

  // Check if a pull request already exists for this branch
  const { data: pullRequests } = await octokit.request(
    'GET /repos/{owner}/{repo}/pulls',
    {
      owner,
      repo,
      head: `${owner}:${targetBranchName}`,
      base: baseBranchName,
    }
  );

  if (pullRequests.length === 0) {
    // Create a new pull request
    await octokit.request('POST /repos/{owner}/{repo}/pulls', {
      owner,
      repo,
      title: '[ds-project] 💅 Sync Tokens',
      head: targetBranchName,
      base: baseBranchName,
      body: 'This PR updates the tokens to the latest version.',
    });
  }
}
