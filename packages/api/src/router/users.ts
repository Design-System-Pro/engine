import { createTRPCRouter, protectedProcedure } from '../trpc';

export const usersRouter = createTRPCRouter({
  getCurrent: protectedProcedure.query(({ ctx }) => {
    return {
      email: ctx.account.email,
    };
  }),
});
