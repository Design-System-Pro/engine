'use server';
import {
  getGithubInstallation,
  getGithubIntegration,
  getGithubRepository,
} from '@/lib/github';

export async function fetchReleases() {
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
