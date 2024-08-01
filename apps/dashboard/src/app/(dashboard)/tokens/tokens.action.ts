'use server';

import type { DesignTokens } from 'style-dictionary/types';
import { eq } from 'drizzle-orm';
import { database } from '@/lib/database';
import { getAccount } from '@/lib/database/utils';

export async function getTokens() {
  const account = await getAccount();

  if (!account) throw new Error('No account found');
  const designSystemId = account.designSystemId;
  if (!designSystemId) return;

  const designSystem = await database.query.designSystemsTable.findFirst({
    where: (designSystems) => eq(designSystems.id, designSystemId),
  });

  return designSystem?.tokens as DesignTokens | undefined;
}
