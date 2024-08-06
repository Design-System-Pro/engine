'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import type { GithubIntegration } from '@/lib/drizzle/schema';
import { integrationType } from '@/lib/drizzle/schema';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function getInstallation() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const result = await database.query.integrationsTable.findFirst({
    where: (integrations) => eq(integrations.type, integrationType.Enum.github),
  });

  if (result?.type === integrationType.Enum.github) {
    return { ...result, data: result.data as GithubIntegration };
  }

  return null;
}
