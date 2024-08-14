import 'server-only';

import type { RequestError } from '@octokit/types';
import type { Octokit } from '@octokit/core';
import {
  getGithubInstallation,
  getGithubIntegration,
  getGithubRepository,
} from './github';

async function getBaseCommitSha({
  octokit,
  branchName,
  mainBranch,
  repo,
  owner,
}: {
  octokit: Octokit;
  branchName: string;
  mainBranch: string;
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
      ref: `heads/${branchName}`,
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
        ref: `heads/${mainBranch}`,
        repo,
        owner,
      });

      // Create a new branch from the main branch
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        ref: `refs/heads/${branchName}`,
        sha: mainSha,
        owner,
        repo,
      });

      return mainSha;
    }

    throw new Error('Error getting base commit SHA');
  }
}

export async function pushFile(file: {
  encoding: 'utf-8' | 'base64';
  content: string;
  name: string;
  path?: string;
}) {
  const repository = await getGithubRepository();
  const integration = await getGithubIntegration();
  const installation = await getGithubInstallation(integration);
  const branchName = 'ds-project/sync-tokens';
  const mainBranch = 'main';

  const baseCommitSha = await getBaseCommitSha({
    branchName,
    mainBranch,
    owner: repository.owner.login,
    repo: repository.name,
    octokit: installation,
  });

  // create a new blob
  const {
    data: { sha: blobSha },
  } = await installation.request('POST /repos/{owner}/{repo}/git/blobs', {
    content: file.content,
    encoding: file.encoding,
    owner: repository.owner.login,
    repo: repository.name,
  });

  // create a new tree
  const {
    data: { sha: treeSha },
  } = await installation.request('POST /repos/{owner}/{repo}/git/trees', {
    base_tree: baseCommitSha,
    tree: [
      {
        path: `${file.path ?? ''}${file.name}`,
        mode: '100644',
        type: 'blob',
        sha: blobSha,
      },
    ],
    owner: repository.owner.login,
    repo: repository.name,
  });

  // create a new commit
  const {
    data: { sha: commitSha },
  } = await installation.request('POST /repos/{owner}/{repo}/git/commits', {
    message: '[ds-project] 💅 Sync Tokens',
    tree: treeSha,
    parents: [baseCommitSha],
    owner: repository.owner.login,
    repo: repository.name,
  });

  // update the branch with the new commit
  await installation.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
    ref: `heads/${branchName}`,
    sha: commitSha,
    owner: repository.owner.login,
    repo: repository.name,
  });

  // Check if a pull request already exists for this branch
  const { data: pullRequests } = await installation.request(
    'GET /repos/{owner}/{repo}/pulls',
    {
      owner: repository.owner.login,
      repo: repository.name,
      head: `${repository.owner.login}:${branchName}`,
      base: mainBranch,
    }
  );

  if (pullRequests.length === 0) {
    // Create a new pull request
    await installation.request('POST /repos/{owner}/{repo}/pulls', {
      owner: repository.owner.login,
      repo: repository.name,
      title: '[ds-project] 💅 Sync Tokens',
      head: branchName,
      base: mainBranch,
      body: 'This PR updates the tokens to the latest version.',
    });
  }
}
