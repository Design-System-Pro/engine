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
}): Promise<{ sha: string; branchType: 'target' | 'base' } | undefined> {
  try {
    // Step 1: Check if the target branch exists
    const {
      data: {
        object: { sha: targetBranchSha },
      },
    } = await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
      ref: `heads/${targetBranchName}`,
      repo,
      owner,
    });

    // If target branch exists, return its commit SHA
    return { sha: targetBranchSha, branchType: 'target' };
  } catch (error: unknown) {
    if ((error as RequestError).status === 404) {
      // Step 2: Target branch doesn't exist, check for the base branch
      try {
        const {
          data: {
            object: { sha: baseSha },
          },
        } = await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
          ref: `heads/${baseBranchName}`,
          repo,
          owner,
        });

        return { sha: baseSha, branchType: 'base' }; // Return the SHA of the base branch (now used by target)
      } catch (baseBranchError: unknown) {
        // Step 4: Handle the case where the base branch doesn't exist (empty repository)
        if ((baseBranchError as RequestError).status === 404) {
          console.log(`No branches exist.`);

          return undefined; // No base branch and no commits exist
        } else {
          throw new Error('Error getting base branch');
        }
      }
    } else if (
      (error as RequestError).status === 409 // This means the repository is empty or unavailable
    ) {
      console.log(`Git repository is empty or unavailable`);
      return undefined;
    } else {
      throw new Error('Error getting target branch SHA');
    }
  }
}
