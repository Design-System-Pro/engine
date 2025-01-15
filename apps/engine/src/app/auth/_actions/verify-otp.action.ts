'use server';

import { z } from 'zod';
import { publicAction } from '@/lib/safe-action';
import { zfd } from 'zod-form-data';
import { scheduleOnboardingEmails } from '../_utils/schedule-onboarding-emails';
import { sendEmail } from '@ds-project/email';
import { config } from '@/config';

export const verifyOtpAction = publicAction
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
    const { error, data } = await ctx.authClient.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (!error) {
      if (
        data.user?.id &&
        data.user.email_confirmed_at &&
        new Date(data.user.email_confirmed_at).getTime() <
          new Date().getTime() + 1000 * 60 * 1 // 1 minute
      ) {
        const result = await ctx.authClient
          .from('accounts')
          .select('id')
          .eq('user_id', data.user.id)
          .single();

        if (result.error) {
          return {
            error: result.error.message,
            ok: false,
          };
        }

        await sendEmail({
          accountId: result.data.id,
          subject: 'Welcome to DS Pro',
          template: {
            key: 'welcome',
            props: {
              staticPathUrl: `${config.pageUrl}/static/email`,
            },
          },
          scheduledAt: 'in 5 minutes',
        });

        await scheduleOnboardingEmails(result.data.id);
        return {
          ok: true,
        };
      }
    }

    return {
      error: error?.message ?? 'Error verifying OTP',
      ok: false,
    };
  });
