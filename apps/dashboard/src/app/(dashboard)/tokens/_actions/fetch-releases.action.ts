'use server';
import {
  getGithubInstallation,
  getGithubIntegration,
  getGithubRepository,
} from '@/lib/github';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function fetchReleases() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const repository = await getGithubRepository();
  const integration = await getGithubIntegration();
  const installation = await getGithubInstallation(integration);

  const { data } = await installation.request(
    'GET /repos/{owner}/{repo}/releases',
    {
      owner: repository.owner.login,
      repo: repository.name,
    }
  );

  return data;
}
