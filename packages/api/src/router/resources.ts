import { z } from 'zod';

import { and, eq } from '@ds-project/database';

import { authenticatedProcedure, createTRPCRouter } from '../trpc';
import { InsertResourcesSchema, Resources } from '@ds-project/database/schema';
import { release } from '../operations/release';
import type { Group } from '@terrazzo/token-tools';
import { parse } from '@terrazzo/parser';

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

  getNormalizedTokens: authenticatedProcedure
    .input(InsertResourcesSchema.pick({ projectId: true, name: true }))
    .query(async ({ ctx, input }) => {
      const [resource] = await ctx.database.query.Resources.findMany({
        columns: {
          designTokens: true,
        },
        where: and(
          eq(Resources.name, input.name),
          eq(Resources.projectId, input.projectId)
        ),
      });

      if (!resource) return null;

      console.log('>>>> designTokens', resource.designTokens);

      const { tokens } = await parse([{ src: resource.designTokens }]);

      console.log('>>>> normalizedTokens', tokens);

      return tokens;
    }),

  updateDesignTokens: authenticatedProcedure
    .input(
      InsertResourcesSchema.pick({ name: true, projectId: true }).extend({
        // TODO: remove casting when zod validation is in place
        designTokens: z.unknown(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [resource] = await ctx.database
        .insert(Resources)
        .values({
          name: input.name,
          projectId: input.projectId,
          // TODO: remove casting when zod validation is in place
          designTokens: input.designTokens as Group,
        })
        .onConflictDoUpdate({
          target: [Resources.name, Resources.projectId],
          set: {
            // TODO: remove casting when zod validation is in place
            designTokens: input.designTokens as Group,
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
        // TODO: remove casting when zod validation is in place
        designTokens: input.designTokens as Group,
      });
    }),

  delete: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.database.delete(Resources).where(eq(Resources.id, input.id));
    }),
});
