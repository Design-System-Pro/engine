import type { NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { database } from '@ds-project/database/client';
import { Resources } from '@ds-project/database/schema';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response('Not authenticated', { status: 401 });
  }

  const { projectId, fileName } = (await request.json()) as {
    projectId: string;
    fileName: string;
  };

  await database.insert(Resources).values({
    projectId,
    name: fileName,
  });

  return new Response('OK', { status: 200 });
}
