import type { Octokit } from '@octokit/core';
import type { RequestError } from '@octokit/types';

export async function getRef({
  targetBranchName,
  baseBranchName,
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
