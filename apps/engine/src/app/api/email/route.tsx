import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { serverEnv } from '@/env/server-env';
import { config } from '@/config';
import { Webhook } from 'standardwebhooks';
import { sendEmail } from '@ds-project/email';

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

    // Send OTP email to the user
    await sendEmail({
      email: user.email,
      subject: 'DS Pro - Confirmation Code',
      template: {
        key: 'verify-otp',
        props: {
          otpCode: token,
          staticPathUrl: `${config.pageUrl}/static/email`,
        },
      },
    });
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
