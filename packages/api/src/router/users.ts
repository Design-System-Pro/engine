import { authenticatedProcedure, createTRPCRouter } from '../trpc';

export const usersRouter = createTRPCRouter({
  getCurrent: authenticatedProcedure.query(({ ctx }) => {
    return {
      email: ctx.account.email,
    };
  }),
});
