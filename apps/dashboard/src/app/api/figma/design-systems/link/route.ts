import type { NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { database } from '@/lib/drizzle';
import { tokensTable } from '@/lib/drizzle/schema/tokens';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response('Not authenticated', { status: 401 });
  }

  const { designSystemId, fileName } = (await request.json()) as {
    designSystemId: string;
    fileName: string;
  };

  await database.insert(tokensTable).values({
    designSystemId,
    name: fileName,
  });

  return new Response('OK', { status: 200 });
}
