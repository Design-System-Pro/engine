import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getProjectId } from '@/lib/supabase/server/utils/get-project-id';
import {
  integrationDataSchema,
  integrationsTable,
  integrationsTableSchema,
  integrationType,
} from '@ds-project/database/schema';
import { database } from '@ds-project/database/client';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const installationId = searchParams.get('installation_id');

  if (!installationId) throw new Error('No installation id provided');

  try {
    const projectId = await getProjectId(request);

    if (!projectId)
      throw new Error('No design system associated with this account');

    const validatedData = integrationDataSchema.parse({
      type: integrationType.enum.github,
      installationId: parseInt(installationId),
    });

    const validatedValues = integrationsTableSchema.parse({
      type: integrationType.Enum.github,
      projectId,
      data: validatedData,
    });

    // Register installation id
    await database.insert(integrationsTable).values(validatedValues);
  } catch (error) {
    console.error('Failed to connect GitHub app.');
  }

  return NextResponse.redirect(origin);
}
