import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { database } from '@/lib/drizzle';
import {
  figmaIntegrationSchema,
  integrationsTable,
  integrationsTableSchema,
  integrationType,
} from '@/lib/drizzle/schema';
import { figma } from '@/lib/figma';
import { getDesignSystemId } from '@/lib/supabase/server/utils/get-design-system-id';

export async function GET(request: NextRequest) {
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

    const designSystemId = await getDesignSystemId(request);

    if (!designSystemId)
      throw new Error('No design system associated with this account');

    const validatedFigmaData = figmaIntegrationSchema.parse({
      type: integrationType.Enum.figma,
      ...figmaOAuthResponse,
    });

    const validatedValues = integrationsTableSchema.parse({
      type: integrationType.Enum.figma,
      designSystemId,
      data: validatedFigmaData,
    });

    await database
      .insert(integrationsTable)
      .values(validatedValues)
      .onConflictDoUpdate({
        target: [integrationsTable.type, integrationsTable.designSystemId],
        set: {
          data: validatedFigmaData,
        },
      });
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error exchanging Figma code', error);
  }

  return NextResponse.redirect(origin);
}
