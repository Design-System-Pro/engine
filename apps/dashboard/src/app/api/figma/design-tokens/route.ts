import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { insertResourcesSchema, resourcesTable } from '@/lib/drizzle/schema';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response('Not authenticated', { status: 401 });
  }

  try {
    const validatedData = insertResourcesSchema
      .pick({ designTokens: true, projectId: true })
      .parse(await request.json());

    await database
      .update(resourcesTable)
      .set({
        designTokens: validatedData.designTokens,
      })
      .where(eq(resourcesTable.projectId, validatedData.projectId));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  return new Response('OK', { status: 200 });
}
