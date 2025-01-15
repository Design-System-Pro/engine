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

    if (error) {
      return {
        error: error.message,
        ok: false,
      };
    }

    // Check if this is a fresh email confirmation (within last 5 minute)
    const isFirstTimeSignIn =
      data.user?.last_sign_in_at &&
      data.user.email_confirmed_at &&
      new Date(data.user.email_confirmed_at).getTime() + 5 * 60 * 1000 > // within five minutes
        new Date(data.user.last_sign_in_at).getTime();

    // Check if user has any previous activity in accounts table
    if (data.user && isFirstTimeSignIn) {
      const result = await ctx.authClient
        .from('accounts')
        .select('id')
        .eq('user_id', data.user.id)
        .single();

      if (result.error) {
        return {
          error: 'Error with the user account',
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
  });
