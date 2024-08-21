import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const projectsRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findFirst({
      with: {
        accountsToProjects: {
          where: (accountsToProjects) =>
            eq(accountsToProjects.accountId, ctx.account.id),
        },
      },
    });
  }),

  account: protectedProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findMany({
      columns: {
        id: true,
        name: true,
      },
      with: {
        accountsToProjects: {
          columns: {
            projectId: true,
          },
          where: (accountsToProjects) =>
            eq(accountsToProjects.accountId, ctx.account.id),
        },
      },
    });
  }),
});
