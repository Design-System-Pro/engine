import 'server-only';

import { getInstallationOctokit } from '../octokit';
import { getBaseCommitSha } from './get-base-commit-sha';

export async function pushFile({
  file,
  owner,
  repo,
  installationId,
  defaultBranchName,
  targetBranchName,
  commitMessage,
  baseBranchName = 'main',
}: {
  file: {
    encoding: 'base64';
    content: string;
    name: string;
    path?: string;
  };
  owner: string;
  repo: string;
  installationId: number;
  defaultBranchName: string;
  targetBranchName: string;
  commitMessage: string;
  baseBranchName?: string;
}) {
  const path = `${file.path ?? ''}${file.name}`;

  const octokit = await getInstallationOctokit(installationId);

  const baseCommitSha = await getBaseCommitSha({
    targetBranchName,
    baseBranchName,
    owner,
    repo,
    octokit,
  });

  if (baseCommitSha) {
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
      base_tree: baseCommitSha.sha,
      tree: [
        {
          path,
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
      message: commitMessage,
      tree: treeSha,
      parents: [baseCommitSha.sha],
      owner,
      repo,
    });

    if (baseCommitSha.branchType === 'base') {
      // create a new branch
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        ref: `refs/heads/${targetBranchName}`,
        sha: commitSha,
        owner,
        repo,
      });
    } else {
      // update the branch with the new commit
      await octokit.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
        ref: `heads/${targetBranchName}`,
        sha: commitSha,
        owner,
        repo,
      });
    }
  } else {
    // // create a new blob
    // create a commit in an empty repository
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      message: commitMessage,
      content: file.content,
      branch: targetBranchName,
    });
  }

  if (defaultBranchName === targetBranchName) {
    // No need to create PR since this is already being committed against the default branch.
    return;
  }

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
      title: commitMessage,
      head: targetBranchName,
      base: baseBranchName,
      body: 'This PR updates the tokens to the latest version.',
    });
  }
}
