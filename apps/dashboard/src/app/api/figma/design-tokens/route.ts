import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { figmaFilesTable } from '@/lib/drizzle/schema';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { RequestSchema } from './_schema';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    throw new Error('Not authenticated');
  }

  const validatedRequestData = RequestSchema.parse(await request.json());

  await database
    .update(figmaFilesTable)
    .set({
      designTokens: validatedRequestData.designTokens,
    })
    .where(eq(figmaFilesTable.id, validatedRequestData.fileId));

  return new Response('OK', { status: 200 });
}
