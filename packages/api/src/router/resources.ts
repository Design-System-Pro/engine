import { z } from 'zod';

import { eq } from '@ds-project/database';

import { authenticatedProcedure, createTRPCRouter } from '../trpc';
import {
  InsertResourcesSchema,
  PreprocessedTokensSchema,
  Resources,
} from '@ds-project/database/schema';
import { release } from '../operations/release';

export const resourcesRouter = createTRPCRouter({
  getById: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findFirst({
        where: eq(Resources.id, input.id),
      });
    }),

  getByProjectId: authenticatedProcedure
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

  linkToProject: authenticatedProcedure
    .input(InsertResourcesSchema.pick({ name: true, projectId: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.database.insert(Resources).values(input).onConflictDoNothing();
    }),

  updateDesignTokens: authenticatedProcedure
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
          target: [Resources.name, Resources.projectId],
          set: {
            designTokens: PreprocessedTokensSchema.parse(input.designTokens),
          },
        })
        .returning({
          insertedDesignTokens: Resources.designTokens,
        });

      if (!resource) return resource;

      try {
        await release({ ctx, designTokens: resource.insertedDesignTokens });
      } catch (error) {
        console.error('💥 error releasing', error);
      }

      return resource;
    }),

  create: authenticatedProcedure
    .input(InsertResourcesSchema)
    .mutation(({ ctx, input }) => {
      return ctx.database.insert(Resources).values({
        name: input.name,
        projectId: input.projectId,
        designTokens: PreprocessedTokensSchema.parse(input.designTokens),
      });
    }),

  delete: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.database.delete(Resources).where(eq(Resources.id, input.id));
    }),
});
