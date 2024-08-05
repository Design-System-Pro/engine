import 'server-only';

import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import type { DesignTokens } from 'style-dictionary/types';
import { updateTokens } from '@/app/(dashboard)/tokens/_actions/update-tokens.action';
import { database } from '../database';
import { designSystemsTable } from '../database/schema';
import { createClient } from './server';

export async function isAuthenticated(request?: NextRequest) {
  const authorizationHeader = request?.headers.get('Authorization');
  const authorizationToken = authorizationHeader?.replace('Bearer ', '');

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(authorizationToken);

  return Boolean(user);
}

export async function getUser(request?: NextRequest) {
  const authorizationHeader = request?.headers.get('Authorization');
  const authorizationToken = authorizationHeader?.replace('Bearer ', '');

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(authorizationToken);

  return user;
}

export async function getUserAccount(request?: NextRequest) {
  const user = await getUser(request);

  if (!user) return;

  const account = await database.query.accountsTable.findFirst({
    where: (accounts) => eq(accounts.userId, user.id),
  });

  return account;
}

export async function getDesignSystemId(request?: NextRequest) {
  const account = await getUserAccount(request);

  if (!account) return;
  const designSystemId = account.designSystemId;
  return designSystemId;
}

export async function updateDesignTokens(request: NextRequest) {
  const account = await getUserAccount(request);
  const { styleDictionary } = (await request.json()) as {
    styleDictionary?: DesignTokens;
  };

  if (!account || !styleDictionary) return;
  const designSystemId = account.designSystemId;
  if (!designSystemId) return;

  await database
    .update(designSystemsTable)
    .set({ tokens: styleDictionary })
    .where(eq(designSystemsTable.id, designSystemId));

  await updateTokens(styleDictionary);
}
