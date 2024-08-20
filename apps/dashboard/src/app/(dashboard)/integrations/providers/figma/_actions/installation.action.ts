'use server';

import type { FigmaIntegration } from '@ds-project/database/schema';
import { api } from '@ds-project/api/rsc';

export async function getInstallation() {
  const integration = await api.integrations.byType('figma');

  if (integration?.type === 'figma') {
    return {
      ...integration,
      data: integration.data as FigmaIntegration,
    };
  }

  return null;
}
