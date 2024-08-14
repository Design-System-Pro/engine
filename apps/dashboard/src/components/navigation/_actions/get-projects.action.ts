'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { getUserAccount } from '@/lib/supabase/server/utils/get-user-account';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function getProjects() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const account = await getUserAccount();

  if (!account) {
    return undefined;
  }

  const projects = await database.query.projectsTable.findMany({
    with: {
      accountsToProjects: {
        where: (accounts) => eq(accounts.accountId, account.id),
      },
    },
  });

  return projects;
}
