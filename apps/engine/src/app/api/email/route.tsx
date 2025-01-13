import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { serverEnv } from '@/env/server-env';
import { SignUpEmail } from '@ds-project/email/src/templates/sign-up';
import { resend } from '@ds-project/email/src/resend';
import { render } from '@ds-project/email/src/render';
import { config } from '@/config';
import { Webhook } from 'standardwebhooks';

interface WebhookPayload {
  user: {
    email: string;
  };
  email_data: {
    token: string;
  };
}

/**
 * Sends a sign up email with an OTP code so the user can authenticate
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  const wh = new Webhook(serverEnv.SEND_EMAIL_HOOK_SECRET);
  const payload = await request.text();
  const headers = Object.fromEntries(request.headers);

  try {
    const {
      user,
      email_data: { token },
    } = wh.verify(payload, headers) as WebhookPayload;

    const html = await render(
      <SignUpEmail
        otpCode={token}
        staticPathUrl={`${config.pageUrl}/static/email`}
      />
    );

    const { error } = await resend.emails.send({
      from: 'DS Pro <noreply@getds.pro>',
      to: [user.email],
      subject: 'DS Pro - Confirmation Code',
      html,
    });

    if (error) {
      throw new Error(error.message, { cause: error.name });
    }
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
