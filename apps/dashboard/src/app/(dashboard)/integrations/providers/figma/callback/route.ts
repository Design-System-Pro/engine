import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { database } from '@/lib/database';
import {
  figmaIntegrationSchema,
  integrationsTable,
  integrationType,
} from '@/lib/database/schema';
import { figma } from '@/lib/figma';

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
    const figmaOAuthResponse = await figma.exchangeCode(code);

    const validatedData = figmaIntegrationSchema.parse({
      type: integrationType.Enum.figma,
      ...figmaOAuthResponse,
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
