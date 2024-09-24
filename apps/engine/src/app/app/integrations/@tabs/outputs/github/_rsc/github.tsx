'use server';

import {
  getGithubApp,
  getInstallationOctokit,
} from '@ds-project/services/github';
import { api } from '@ds-project/api/rsc';
import { GithubCard } from '../_components/github-card';

export async function Github() {
  const githubApp = getGithubApp();

  const installationUrl = await githubApp.getInstallationUrl();

  const githubIntegration = await api.integrations.github();

  const repositories = await (async () => {
    if (githubIntegration) {
      const octokit = await getInstallationOctokit(
        githubIntegration.data.installationId
      );
      const { data } = await octokit.request('GET /installation/repositories');
      return data.repositories;
    }
  })();

  const isInstallationActive = Boolean(githubIntegration?.data.installationId);

  return (
    <GithubCard
      enableUrl={installationUrl}
      isEnabled={isInstallationActive}
      integration={githubIntegration}
      repositories={repositories}
    />
  );
}
