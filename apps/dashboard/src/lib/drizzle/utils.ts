'server-only';

import { eq } from 'drizzle-orm';
import { database } from '@ds-project/database/client';
import { api } from '../trpc/server';

export async function getAccount() {
  const account = await api.accounts.current();

  return account;
}

export async function getTokens() {
  const account = await getAccount();

  if (!account) throw new Error('No account found');

  const project = await database.query.Projects.findFirst({
    columns: {
      id: true,
    },
    with: {
      accountsToProjects: {
        where: (accountsToProjects) =>
          eq(accountsToProjects.accountId, account.id),
      },
    },
  });

  if (!project?.id) return;

  const resource = await database.query.Resources.findFirst({
    where: (resources) => eq(resources.projectId, project.id),
  });

  return resource?.designTokens;
}
