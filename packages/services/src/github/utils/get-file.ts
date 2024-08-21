'use server';

import { getInstallationOctokit } from '../octokit';
import { getRef } from './get-ref';

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
