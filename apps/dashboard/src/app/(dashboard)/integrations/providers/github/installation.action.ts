'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/database';
import type { GithubIntegration } from '@/lib/database/schema';
import { integrationType } from '@/lib/database/schema';
import { isAuthenticated } from '@/lib/supabase/utils';

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
