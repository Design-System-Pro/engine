import { z } from 'zod';

import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import {
  InsertResourcesSchema,
  PreprocessedTokensSchema,
  Resources,
} from '@ds-project/database/schema';

export const resourcesRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findFirst({
        where: eq(Resources.id, input.id),
      });
    }),

  byProjectId: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findMany({
        with: {
          project: {
            with: {
              resources: true,
              accountsToProjects: {
                where: (accountsToProjects) =>
                  eq(accountsToProjects.projectId, input.projectId),
              },
            },
          },
        },
      });
    }),

  link: protectedProcedure
    .input(InsertResourcesSchema.pick({ name: true, projectId: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.database.insert(Resources).values(input);
    }),

  updateDesignTokens: protectedProcedure
    .input(z.object({ name: z.string(), designTokens: z.any() }))
    .mutation(async ({ ctx, input }) => {
      console.log('🤯 Here');

      const result = await ctx.database
        .update(Resources)
        .set({
          ...input,
          // For some reason, if the validation happens at the input level, it gets a max stack call error.
          // But moving it here it works 🤷🏻‍♂️
          designTokens: PreprocessedTokensSchema.parse(input.designTokens),
        })
        .where(eq(Resources.name, input.name));
      // TODO: Run update to Integration here ---> GitHub

      return result;
    }),

  create: protectedProcedure
    .input(InsertResourcesSchema)
    .mutation(({ ctx, input }) => {
      return ctx.database.insert(Resources).values(input);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.database.delete(Resources).where(eq(Resources.id, input.id));
    }),
});
