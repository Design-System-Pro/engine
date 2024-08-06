import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { database } from '@/lib/drizzle';
import {
  integrationDataSchema,
  integrationsTable,
  integrationsTableSchema,
  integrationType,
} from '@/lib/drizzle/schema';
import { getDesignSystemId } from '@/lib/supabase/server/utils/get-design-system-id';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const installationId = searchParams.get('installation_id');

  if (!installationId) throw new Error('No installation id provided');

  try {
    const designSystemId = await getDesignSystemId(request);

    if (!designSystemId)
      throw new Error('No design system associated with this account');

    const validatedData = integrationDataSchema.parse({
      type: integrationType.enum.github,
      installationId: parseInt(installationId),
    });

    const validatedValues = integrationsTableSchema.parse({
      type: integrationType.Enum.github,
      designSystemId,
      data: validatedData,
    });

    // Register installation id
    await database.insert(integrationsTable).values(validatedValues);
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Failed to connect GitHub app.');
  }

  return NextResponse.redirect(origin);
}
