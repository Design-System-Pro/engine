import { z } from 'zod';

import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import { Resources } from '@ds-project/database/schema';

export const integrationsRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findFirst({
        where: eq(Resources.id, input.id),
      });
    }),

  github: protectedProcedure.query(async ({ ctx }) => {
    const queryResult = await ctx.database.query.Integrations.findFirst({
      columns: {
        data: true,
      },
      where: (integrations) => eq(integrations.type, 'github'),
      with: {
        project: {
          columns: {
            id: true,
          },
          with: {
            accountsToProjects: {
              columns: {
                projectId: true,
              },
              where: (accountsToProjects) =>
                eq(accountsToProjects.accountId, ctx.account.id),
            },
          },
        },
      },
    });

    if (queryResult?.data?.type === 'github') {
      return {
        ...queryResult,
        data: queryResult.data,
      };
    }

    return undefined;
  }),

  figma: protectedProcedure.query(async ({ ctx }) => {
    const queryResult = await ctx.database.query.Integrations.findFirst({
      columns: {
        data: true,
      },
      where: (integrations) => eq(integrations.type, 'figma'),
      with: {
        project: {
          columns: {
            id: true,
          },
          with: {
            accountsToProjects: {
              columns: {
                projectId: true,
              },
              where: (accountsToProjects) =>
                eq(accountsToProjects.accountId, ctx.account.id),
            },
          },
        },
      },
    });

    if (queryResult?.data?.type === 'figma') {
      return {
        ...queryResult,
        data: queryResult.data,
      };
    }

    return undefined;
  }),
});
