import { eq } from '@ds-project/database';

import { createTRPCRouter, authenticatedProcedure } from '../trpc';

export const accountsRouter = createTRPCRouter({
  getCurrent: authenticatedProcedure.query(({ ctx }) => {
    return ctx.database.query.Accounts.findFirst({
      where: (accounts) => eq(accounts.id, ctx.account.id),
    });
  }),
});
