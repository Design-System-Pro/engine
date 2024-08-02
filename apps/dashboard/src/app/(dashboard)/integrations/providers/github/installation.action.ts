'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/database';
import type { GithubIntegration } from '@/lib/database/schema';
import { integrationType } from '@/lib/database/schema';
import { createClient } from '@/lib/supabase/server';

export async function getInstallation() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const result = await database.query.integrationsTable.findFirst({
    where: (integrations) => eq(integrations.type, integrationType.Enum.github),
  });

  if (result?.type === integrationType.Enum.github) {
    return { ...result, data: result.data as GithubIntegration };
  }

  return null;
}
