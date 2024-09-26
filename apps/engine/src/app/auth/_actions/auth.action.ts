'use server';

import { z } from 'zod';
import { unprotectedAction } from '@/lib/safe-action';

export const authAction = unprotectedAction
  .metadata({ actionName: 'authAction' })
  .schema(
    z.object({
      email: z.string().email(),
    })
  )
  .action(async ({ ctx, parsedInput: { email } }) => {
    const { error } = await ctx.authClient.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (!error) {
      return {
        ok: true,
      };
    }

    return {
      error: error.message,
      ok: false,
    };
  });
