'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/database';
import type { FigmaIntegration } from '@/lib/database/schema';
import { integrationType } from '@/lib/database/schema';
import { isAuthenticated } from '@/lib/supabase/utils';

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
