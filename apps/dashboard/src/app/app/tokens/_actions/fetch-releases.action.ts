'use server';

import { api } from '@ds-project/api/rsc';
import { getInstallationOctokit } from '@ds-project/services/github';

export async function fetchReleases() {
  const githubIntegration = await api.integrations.github();

  if (!githubIntegration) {
    return null;
  }

  const octokit = await getInstallationOctokit(
    githubIntegration.data.installationId
  );

  const repositories = await octokit.request('GET /installation/repositories');

  const repository = repositories.data.repositories.find(
    (_repository) => _repository.id === githubIntegration.data.repositoryId
  );

  if (!repository) throw new Error('No repository found');

  const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: repository.owner.login,
    repo: repository.name,
  });

  return data;
}
