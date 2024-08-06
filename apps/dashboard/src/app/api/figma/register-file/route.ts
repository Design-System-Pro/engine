import type { NextRequest } from 'next/server';
import { database } from '@/lib/drizzle';
import { figmaFilesTable, insertFigmaFileSchema } from '@/lib/drizzle/schema';
import { getAccount } from '@/lib/drizzle/utils';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

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
