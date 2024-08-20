import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const projectsRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx }) => {
    const account = await ctx.database.query.Accounts.findFirst({
      where: (accounts) => eq(accounts.id, ctx.account.id),
    });

    if (!account) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Account not found' });
    }

    return ctx.database.query.Projects.findFirst({
      with: {
        accountsToProjects: {
          where: (accountsToProjects) =>
            eq(accountsToProjects.accountId, account.id),
        },
      },
    });
  }),

  byAccount: protectedProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findMany({
      with: {
        accountsToProjects: {
          where: (accountsToProjects) =>
            eq(accountsToProjects.accountId, ctx.account.id),
        },
      },
    });
  }),
});
