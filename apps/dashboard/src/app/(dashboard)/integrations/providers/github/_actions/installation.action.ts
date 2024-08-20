'use server';

import type { GithubIntegration } from '@ds-project/database/schema';
import { api } from '@ds-project/api/rsc';

export async function getInstallation() {
  const integration = await api.integrations.byType('github');

  if (integration?.type === 'github') {
    return { ...integration, data: integration.data as GithubIntegration };
  }

  return null;
}
