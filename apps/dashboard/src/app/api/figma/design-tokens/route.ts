import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { insertResourcesSchema, resourcesTable } from '@/lib/drizzle/schema';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { pushFile } from '@/lib/github';
import { config } from '@/config';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response('Not authenticated', { status: 401 });
  }

  try {
    const validatedData = insertResourcesSchema
      .pick({ designTokens: true, projectId: true })
      .parse(await request.json());

    // Update database
    await database
      .update(resourcesTable)
      .set({
        designTokens: validatedData.designTokens,
      })
      .where(eq(resourcesTable.projectId, validatedData.projectId));

    // Update Github - TODO: turn into "update integrations" actions
    const base64Content = btoa(
      JSON.stringify(validatedData.designTokens, null, 2)
    );
    await pushFile({
      content: base64Content,
      encoding: 'base64',
      name: `${config.gitTokensPath}/tokens.json`,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  return new Response('OK', { status: 200 });
}
