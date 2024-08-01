import 'server-only';

import { App } from '@octokit/app';
import { eq } from 'drizzle-orm';
import { config } from '@/config';
import { database } from '../database';
import type { SelectIntegration } from '../database/schema';
import { integrationType } from '../database/schema';

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

  if (!integration) {
    throw new Error('No GitHub integration found');
  }

  return integration;
}

export async function getGithubInstallation(integration: SelectIntegration) {
  const octokit = await githubApp.getInstallationOctokit(
    integration.installationId
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
    (_repository) => _repository.id === integration.repositoryId
  );

  if (!repository) throw new Error('No repository found');

  return repository;
}
