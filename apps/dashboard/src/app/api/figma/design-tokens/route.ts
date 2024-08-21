import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';

import { getInstallationOctokit, pushFile } from '@ds-project/services/github';
import { config } from '@/config';
import { InsertResourcesSchema, Resources } from '@ds-project/database/schema';
import { database } from '@ds-project/database/client';
import { api } from '@ds-project/api/rsc';

export async function POST(request: NextRequest) {
  try {
    const validatedData = InsertResourcesSchema.pick({
      designTokens: true,
      projectId: true,
    }).parse(await request.json());

    // Update database
    await database
      .update(Resources)
      .set({
        designTokens: validatedData.designTokens,
      })
      .where(eq(Resources.projectId, validatedData.projectId));

    // Update Github - TODO: turn into "update integrations" actions
    const githubIntegration = await api.integrations.github();

    if (!githubIntegration) {
      throw new Error('No GitHub integration found');
    }

    const octokit = await getInstallationOctokit(
      githubIntegration.data.installationId
    );

    const repositories = await octokit.request(
      'GET /installation/repositories'
    );

    const repository = repositories.data.repositories.find(
      (_repository) => _repository.id === githubIntegration.data.repositoryId
    );

    if (!repository) throw new Error('No repository found');

    const base64Content = btoa(
      JSON.stringify(validatedData.designTokens, null, 2)
    );
    await pushFile({
      file: {
        content: base64Content,
        encoding: 'base64',
        name: `/tokens.json`,
        path: `${config.gitTokensPath}`,
      },
      installationId: githubIntegration.data.installationId,
      owner: repository.owner.login,
      repo: repository.name,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  return new Response('OK', { status: 200 });
}
