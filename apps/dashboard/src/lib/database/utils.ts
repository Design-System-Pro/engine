'server-only';

import { eq } from 'drizzle-orm';
import { createClient } from '../supabase/server';
import { database } from '.';

export async function getAccount() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const account = await database.query.accountsTable.findFirst({
    where: (accounts) => eq(accounts.userId, user.id),
  });

  return account;
}
