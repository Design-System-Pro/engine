'server-only';

import { eq } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { createServerClient } from '../supabase/server/client';
import { database } from '.';

export async function getAccount(request?: NextRequest) {
  const authorizationHeader = request?.headers.get('Authorization');
  const authorizationToken = authorizationHeader?.replace('Bearer ', '');

  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(authorizationToken);

  if (!user) throw new Error('Not authenticated');

  const account = await database.query.accountsTable.findFirst({
    where: (accounts) => eq(accounts.userId, user.id),
  });

  return account;
}

export async function getTokens(request?: NextRequest) {
  const account = await getAccount(request);

  if (!account) throw new Error('No account found');
  const designSystemId = account.designSystemId;
  if (!designSystemId) return;

  const designSystem = await database.query.resourcesTable.findFirst({
    where: (resources) => eq(resources.designSystemId, designSystemId),
  });

  return designSystem?.designTokens;
}
