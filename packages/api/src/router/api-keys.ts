import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { KeyHippo } from 'keyhippo';

export const apiKeysRouter = createTRPCRouter({
  list: protectedProcedure
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

  create: protectedProcedure
    .input(z.object({ description: z.string() }))
    .output(
      z.object({
        apiKey: z.string().nullable(),
        status: z.enum(['success', 'failed']),
        error: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const keyHippo = new KeyHippo(ctx.supabase);
      return await keyHippo.createApiKey(ctx.account.userId, input.description);
    }),

  revoke: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const keyHippo = new KeyHippo(ctx.supabase);
      await keyHippo.revokeApiKey(ctx.account.userId, input.id);
    }),
});
