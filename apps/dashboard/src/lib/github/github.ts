import 'server-only';

import { App } from '@octokit/app';
import { eq } from 'drizzle-orm';
import { config } from '@/config';
import { database } from '../drizzle';
import type {
  GithubIntegration,
  SelectGithubIntegration,
} from '../drizzle/schema';
import { integrationType } from '../drizzle/schema';

const githubApp = new App({
  appId: config.github.appId,
  privateKey: config.github.appPrivateKey,
  oauth: {
    clientId: config.github.appClientId,
    clientSecret: config.github.appClientSecret,
  },
});

export async function getGithubIntegration() {
  const integration = await database.query.integrationsTable.findFirst({
    where: (integrations) => eq(integrations.type, integrationType.Enum.github),
  });

  if (
    integration?.type !== integrationType.Enum.github &&
    integration?.data?.type !== integrationType.Enum.github
  ) {
    throw new Error('No GitHub integration found');
  }

  return { ...integration, data: integration.data as GithubIntegration };
}

export async function getGithubInstallation(
  integration: SelectGithubIntegration
) {
  const octokit = await githubApp.getInstallationOctokit(
    integration.data.installationId
  );

  return octokit;
}

export async function getGithubRepository() {
  const integration = await getGithubIntegration();

  const installation = await getGithubInstallation(integration);

  const repositories = await installation.request(
    'GET /installation/repositories'
  );
  const repository = repositories.data.repositories.find(
    (_repository) => _repository.id === integration.data.repositoryId
  );

  if (!repository) throw new Error('No repository found');

  return repository;
}
