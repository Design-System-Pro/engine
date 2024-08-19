import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { getUserAccount } from './get-user-account';
import { database } from '@ds-project/database/client';

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
