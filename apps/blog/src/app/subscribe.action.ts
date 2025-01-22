'use server';

import { serverEnv } from '@/env/server-env';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email');

  const { ok } = await fetch('https://api.useplunk.com/v1/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${serverEnv.PLUNK_API_KEY}`,
    },
    body: JSON.stringify({
      event: 'subscribed',
      email,
      subscribed: false,
    }),
  });

  if (!ok) {
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }

  // This is where you'd typically integrate with your email service
  // For now, we'll just return a success message
  return {
    success: true,
    message:
      'Thanks for subscribing! Check your email to confirm your subscription.',
  };
}
