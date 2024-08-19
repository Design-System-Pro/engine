'use server';

import { eq } from 'drizzle-orm';

import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { database } from '@ds-project/database/client';
import type { FigmaIntegration } from '@ds-project/database/schema';
import { integrationType } from '@ds-project/database/schema';

export async function getInstallation() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const result = await database.query.integrationsTable.findFirst({
    where: (integrations) => eq(integrations.type, integrationType.Enum.figma),
  });

  if (result?.type === integrationType.Enum.figma) {
    return {
      ...result,
      data: result.data as FigmaIntegration,
    };
  }

  return null;
}
