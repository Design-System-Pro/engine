import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { getUser } from './get-user';

export async function getUserAccount(request?: NextRequest) {
  const user = await getUser(request);

  if (!user) return;

  const account = await database.query.accountsTable.findFirst({
    where: (accounts) => eq(accounts.userId, user.id),
  });

  return account;
}
