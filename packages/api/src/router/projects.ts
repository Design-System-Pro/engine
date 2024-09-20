import { eq } from '@ds-project/database';

import { apiProcedure, createTRPCRouter, protectedProcedure } from '../trpc';
import { AccountsToProjects, Projects } from '@ds-project/database/schema';

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

  account: apiProcedure.query(async ({ ctx }) => {
    return ctx.database
      .select({
        id: Projects.id,
        name: Projects.name,
      })
      .from(Projects)
      .leftJoin(
        AccountsToProjects,
        eq(AccountsToProjects.projectId, Projects.id)
      )
      .where(eq(AccountsToProjects.accountId, ctx.account.id));
  }),

  all: apiProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findMany();
  }),
});
