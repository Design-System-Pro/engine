import { eq } from '@ds-project/database';

import {
  createTRPCRouter,
  authenticatedProcedure,
  serviceProcedure,
} from '../trpc';
import { SelectAccountsSchema } from '@ds-project/database/schema';

export const accountsRouter = createTRPCRouter({
  getCurrent: authenticatedProcedure.query(({ ctx }) => {
    return ctx.database.query.Accounts.findFirst({
      where: (accounts) => eq(accounts.id, ctx.account.id),
    });
  }),
  get: serviceProcedure
    .input(SelectAccountsSchema.pick({ id: true }))
    .query(({ ctx, input }) => {
      return ctx.database.query.Accounts.findFirst({
        where: (accounts) => eq(accounts.id, input.id),
        columns: {
          email: true,
          id: true,
        },
      });
    }),
});
