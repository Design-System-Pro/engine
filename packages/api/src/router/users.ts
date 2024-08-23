import { createTRPCRouter, protectedProcedure } from '../trpc';

export const usersRouter = createTRPCRouter({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.user
      ? {
          email: ctx.user.email,
        }
      : null;
  }),
});
