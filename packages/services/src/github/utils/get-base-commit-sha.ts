import type { Octokit } from '@octokit/core';
import type { RequestError } from '@octokit/types';

export async function getBaseCommitSha({
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
}): Promise<string> {
  try {
    // Try to get the head SHA of the target branch if it exists
    const {
      data: {
        object: { sha: targetBranchSha },
      },
    } = await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
      ref: `heads/${targetBranchName}`,
      repo,
      owner,
    });

    return targetBranchSha; // return the target SHA to the head of the existing branch
  } catch (error: unknown) {
    if ((error as RequestError).status === 404) {
      // If the branch does not exist, use the base branch as the base
      const {
        data: {
          object: { sha: baseSha },
        },
      } = await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
        ref: `heads/${baseBranchName}`,
        repo,
        owner,
      });

      // Create a new branch from the base branch
      await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        ref: `refs/heads/${targetBranchName}`,
        sha: baseSha,
        owner,
        repo,
      });

      return baseSha;
    }

    throw new Error('Error getting base commit SHA');
  }
}
