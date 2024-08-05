import type { NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/supabase/utils';
import { database } from '@/lib/database';
import { figmaFilesTable, insertFigmaFileSchema } from '@/lib/database/schema';
import { getAccount } from '@/lib/database/utils';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response(null, {
      status: 401,
    });
  }

  const account = await getAccount(request);

  const validatedValues = insertFigmaFileSchema.parse({
    ...(await request.json()),
    designSystemId: account?.designSystemId,
  });

  await database
    .insert(figmaFilesTable)
    .values(validatedValues)
    .onConflictDoNothing();

  return Response.json(null, { status: 200 });
}
