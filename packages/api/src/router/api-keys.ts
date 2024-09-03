import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { ApiKeys } from '@ds-project/database/schema';
import { eq } from '@ds-project/database';

export const apiKeysRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const apiKeys = await ctx.database.query.ApiKeys.findMany({
      where: eq(ApiKeys.accountId, ctx.account.id),
    });

    return apiKeys;
  }),

  create: protectedProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const apiKey = await ctx.database
        .insert(ApiKeys)
        .values({
          accountId: ctx.account.id,
          description: input.description,
        })
        .returning();

      return apiKey;
    }),

  revoke: protectedProcedure
    .input(z.object({ apiKeyId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.database.delete(ApiKeys).where(eq(ApiKeys.id, input.apiKeyId));
    }),
});
