import { createTRPCRouter, protectedProcedure } from '../trpc';

export const projectsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findMany();
  }),

  getFirst: protectedProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findFirst();
  }),
});
