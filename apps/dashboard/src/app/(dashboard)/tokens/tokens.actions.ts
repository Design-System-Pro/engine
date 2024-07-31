'use server';

import type { DesignTokens } from 'style-dictionary/types';
import { eq } from 'drizzle-orm';
import { createClient } from '@/lib/supabase/server';
import { database } from '@/lib/database';

export async function getTokens() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const account = await database.query.accountsTable.findFirst({
    where: (accounts) => eq(accounts.userId, user.id),
  });

  if (!account) return;
  const designSystemId = account.designSystemId;
  if (!designSystemId) return;

  const designSystem = await database.query.designSystemsTable.findFirst({
    where: (designSystems) => eq(designSystems.id, designSystemId),
  });

  return designSystem?.tokens as DesignTokens | undefined;
}
