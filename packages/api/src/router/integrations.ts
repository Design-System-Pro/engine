import { z } from 'zod';

import { eq } from '@ds-project/database';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import { Resources } from '@ds-project/database/schema';
import {
  selectFigmaIntegration,
  selectGithubIntegration,
} from '../queries/integrations';

export const integrationsRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.database.query.Resources.findFirst({
        where: eq(Resources.id, input.id),
      });
    }),

  github: protectedProcedure.query(async ({ ctx }) => {
    return selectGithubIntegration({ ctx });
  }),

  figma: protectedProcedure.query(async ({ ctx }) => {
    return selectFigmaIntegration({ ctx });
  }),
});
