import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { config } from '@/config';
import { database } from '@/lib/database';
import {
  figmaIntegrationSchema,
  integrationsTable,
  integrationType,
} from '@/lib/database/schema';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!state) {
    throw new Error('No state provided');
  }

  if (!code) {
    throw new Error('No code provided');
  }

  if (state) {
    const validState = await kv.getdel<{ state: string }>(state);

    if (validState?.state !== state) {
      throw new Error('Invalid state');
    }
  }

  try {
    const result = await fetch('https://www.figma.com/api/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${encodeURIComponent(config.figma.appClientId)}&client_secret=${encodeURIComponent(config.figma.appClientSecret)}&redirect_uri=${encodeURIComponent(config.figma.redirectUri)}&code=${encodeURIComponent(code)}&grant_type=authorization_code`,
    });

    if (!result.ok) {
      throw new Error('Error exchanging code');
    }

    const figmaOAuthResponse = (await result.json()) as {
      user_id: string;
      access_token: string;
      expires_in: string;
      refresh_token: string;
    };

    const validatedData = figmaIntegrationSchema.parse({
      type: integrationType.Enum.figma,
      accessToken: figmaOAuthResponse.access_token,
      refreshToken: figmaOAuthResponse.refresh_token,
      userId: figmaOAuthResponse.user_id,
      expiresIn: figmaOAuthResponse.expires_in,
    });

    await database.insert(integrationsTable).values({
      type: integrationType.Enum.figma,
      data: validatedData,
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error exchanging Figma code', error);
  }

  return NextResponse.redirect(origin);
}
