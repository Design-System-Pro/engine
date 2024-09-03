import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { KeyHippo } from 'keyhippo';

export const hippoKeysRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    // const keyHippo = new KeyHippo(ctx.supabase);
    // const apiKeys = await keyHippo.getAllKeyMetadata(ctx.account.userId);
    // return apiKeys;
    // const apiKeys = await keyHippo.loadApiKeyInfo(ctx.account.userId);

    // console.log({ apiKeys });

    // return apiKeys.map(({ id, description }) => ({ id, description }));
    return [];
  }),

  create: protectedProcedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const keyHippo = new KeyHippo(ctx.supabase);
      const newApiKey = await keyHippo.createApiKey(
        ctx.account.userId,
        input.description
      );

      console.log({ newApiKey }); // ["{\"id\": \"e6b448a4-e652-4180-8aaa-5ab8d38d2a9d\", \"description\": \"fc09615c-f6e4-40e7-87cb-a26702c5d8bd-3af1c6f4-3fac-49a1-b43a-f29bb5cf5248-New\"}"]

      return newApiKey;
    }),

  revoke: protectedProcedure
    .input(z.object({ secretId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const keyHippo = new KeyHippo(ctx.supabase);
      await keyHippo.revokeApiKey(ctx.account.userId, input.secretId);
    }),
});
