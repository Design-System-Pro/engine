import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const accountsRouter = createTRPCRouter({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.database.query.Accounts.findFirst({
      where: (accounts) => eq(accounts.id, ctx.account.id),
    });
  }),
});
