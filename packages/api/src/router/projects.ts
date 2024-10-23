import { createTRPCRouter, authenticatedProcedure } from '../trpc';

export const projectsRouter = createTRPCRouter({
  getAll: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findMany();
  }),

  getFirst: authenticatedProcedure.query(async ({ ctx }) => {
    return ctx.database.query.Projects.findFirst();
  }),
});
