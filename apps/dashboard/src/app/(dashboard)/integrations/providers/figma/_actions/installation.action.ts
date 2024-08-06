'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import type { FigmaIntegration } from '@/lib/drizzle/schema';
import { integrationType } from '@/lib/drizzle/schema';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

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
