import { createTRPCRouter, protectedProcedure } from '../trpc';
import { KeyHippo } from 'keyhippo';

export const authRouter = createTRPCRouter({
  start: protectedProcedure.mutation(async ({ ctx }) => {
    const keyHippo = new KeyHippo(ctx.supabase);
    const newApiKey = await keyHippo.createApiKey(
      ctx.account.userId,
      'DS Figma Widget API Key'
    );

    return newApiKey.apiKey;
  }),
});
