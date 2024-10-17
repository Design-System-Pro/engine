import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  Integrations,
  InsertIntegrationsSchema,
  integrationType,
  githubIntegrationSchema,
} from '@ds-project/database/schema';
import { database } from '@ds-project/database/client';
import { api } from '@ds-project/api/rsc';
import { config } from '@/config';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const installationId = searchParams.get('installation_id');

  if (!installationId) throw new Error('No installation id provided');

  try {
    const project = await api.projects.getFirst();

    if (!project?.id)
      throw new Error('No design system associated with this account');

    const validatedData = githubIntegrationSchema.parse({
      type: integrationType.enum.github,
      installationId: parseInt(installationId),
      tokensPath: config.defaultGitTokensPath,
      targetGitBranch: config.defaultTargetGitBranch,
      defaultCommitMessage: config.defaultCommitMessage,
    });

    const validatedValues = InsertIntegrationsSchema.parse({
      type: integrationType.Enum.github,
      projectId: project.id,
      data: validatedData,
    });

    // Register installation id
    await database.insert(Integrations).values(validatedValues);
  } catch (error) {
    console.error('Failed to connect GitHub app.');
  }

  return NextResponse.redirect(`${origin}/app/integrations/outputs`);
}
