import { z } from 'zod';

import { desc, eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { InsertResourcesSchema, Resources } from '@ds-project/database/schema';

export const resourcesRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.database.query.Resources.findMany({
      orderBy: desc(Resources.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findFirst({
        where: eq(Resources.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(InsertResourcesSchema)
    .mutation(({ ctx, input }) => {
      return ctx.database.insert(Resources).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.database.delete(Resources).where(eq(Resources.id, input));
  }),
});
