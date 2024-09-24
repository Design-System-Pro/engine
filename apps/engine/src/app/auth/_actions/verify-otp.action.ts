'use server';

import { z } from 'zod';
import { unprotectedAction } from '@/lib/safe-action';
import { zfd } from 'zod-form-data';

export const verifyOtpAction = unprotectedAction
  .metadata({ actionName: 'verifyOtpAction' })
  .schema(
    z.object({
      email: zfd.text(z.string().email()),
      token: zfd.text(
        z.string().min(6, {
          message: 'Your one-time password must be 6 characters.',
        })
      ),
    })
  )
  .action(async ({ ctx, parsedInput: { email, token } }) => {
    const { error } = await ctx.authClient.auth.verifyOtp({
      email,
      token,
      type: 'email',
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
