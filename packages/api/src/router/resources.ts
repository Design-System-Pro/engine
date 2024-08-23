import { z } from 'zod';

import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import {
  InsertResourcesSchema,
  PreprocessedTokensSchema,
  Resources,
} from '@ds-project/database/schema';
import { release } from '../operations/release';

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
    .input(
      z.object({
        name: z.string(),
        designTokens: z.any(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [resource] = await ctx.database
        .insert(Resources)
        .values({
          name: input.name,
          projectId: input.projectId,
          // For some reason, if the validation happens at the input level, it gets a max stack call error.
          // But moving it here it works 🤷🏻‍♂️
          designTokens: PreprocessedTokensSchema.parse(input.designTokens),
        })
        .onConflictDoUpdate({
          target: Resources.name,
          set: {
            designTokens: PreprocessedTokensSchema.parse(input.designTokens),
          },
        })
        .returning({
          insertedDesignTokens: Resources.designTokens,
        });

      if (!resource) return resource;

      await release({ ctx, designTokens: resource.insertedDesignTokens });

      return resource;
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
