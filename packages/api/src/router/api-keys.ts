import { z } from 'zod';
import { createTRPCRouter, authenticatedProcedure } from '../trpc';
import { KeyHippo } from 'keyhippo';
import { createApiKey } from '../operations/create-api-key';

export const apiKeysRouter = createTRPCRouter({
  list: authenticatedProcedure
    .output(
      z.array(
        z.object({
          id: z.string(),
          description: z.string(),
        })
      )
    )
    .query(async ({ ctx }) => {
      const keyHippo = new KeyHippo(ctx.supabase);
      return await keyHippo.loadApiKeyInfo(ctx.account.userId);
    }),

  create: authenticatedProcedure
    .input(z.object({ description: z.string() }))
    .output(
      z.object({
        apiKey: z.string().nullable(),
        status: z.enum(['success', 'failed']),
        error: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return createApiKey({
        supabase: ctx.supabase,
        userId: ctx.account.userId,
        description: input.description,
      });
    }),

  revoke: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const keyHippo = new KeyHippo(ctx.supabase);
      await keyHippo.revokeApiKey(ctx.account.userId, input.id);
    }),
});
