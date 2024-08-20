import type { NextRequest } from 'next/server';
import { database } from '@ds-project/database/client';
import { Resources } from '@ds-project/database/schema';

export async function POST(request: NextRequest) {
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
