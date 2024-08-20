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

  byType: protectedProcedure
    .input(z.enum(['github', 'figma']))
    .query(async ({ ctx, input }) => {
      return ctx.database.query.Integrations.findFirst({
        where: (integrations) => eq(integrations.type, input),
        with: {
          project: {
            with: {
              accountsToProjects: {
                where: (accountsToProjects) =>
                  eq(accountsToProjects.accountId, ctx.account.id),
              },
            },
          },
        },
      });
    }),
});
