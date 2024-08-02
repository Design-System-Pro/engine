import { NextResponse } from 'next/server';
import { database } from '@/lib/database';
import {
  integrationDataSchema,
  integrationsTable,
  integrationType,
} from '@/lib/database/schema';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const installationId = searchParams.get('installation_id');

  if (!installationId) throw new Error('No installation id provided');

  try {
    const validatedData = integrationDataSchema.parse({
      type: integrationType.enum.github,
      installationId: parseInt(installationId),
    });

    // Register installation id
    await database.insert(integrationsTable).values({
      type: integrationType.Enum.github,
      data: validatedData,
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Failed to connect GitHub app.');
  }

  return NextResponse.redirect(origin);
}
