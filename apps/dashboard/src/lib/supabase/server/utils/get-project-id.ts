import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { getUserAccount } from './get-user-account';

export async function getProjectId(request?: NextRequest) {
  const account = await getUserAccount(request);

  if (!account) return;

  const project = await database.query.projectsTable.findFirst({
    with: {
      accountsToProjects: {
        where: (accountsToProjects) =>
          eq(accountsToProjects.accountId, account.id),
      },
    },
  });

  return project?.id;
}
