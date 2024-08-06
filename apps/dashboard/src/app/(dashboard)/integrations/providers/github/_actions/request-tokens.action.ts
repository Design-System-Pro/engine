'use server';

import type { DesignTokens } from 'style-dictionary/types';
import {
  getGithubInstallation,
  getGithubIntegration,
  getGithubRepository,
} from '@/lib/github';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function requestTokens() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  try {
    const githubIntegration = await getGithubIntegration();
    const repository = await getGithubRepository();
    const installation = await getGithubInstallation(githubIntegration);

    const response = await installation.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: repository.owner.login,
        repo: repository.name,
        path: 'tokens.json',
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
