'use server';

import { database } from '@/lib/database';
import { integrationsTable } from '@/lib/database/schema';
import { createClient } from '@/lib/supabase/server';

export async function getInstallation() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const result = await database.select().from(integrationsTable);

  return result.at(0);
}
