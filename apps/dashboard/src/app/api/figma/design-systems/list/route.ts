import type { NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { database } from '@/lib/drizzle';
import { projectsTable } from '@/lib/drizzle/schema';
import { getProjectId } from '@/lib/supabase/server/utils/get-project-id';

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response('Not authenticated', { status: 401 });
  }

  const projectId = await getProjectId(request);

  if (!projectId) {
    return new Response('No project associated with this account', {
      status: 404,
    });
  }

  const projects = await database
    .select({
      id: projectsTable.id,
      name: projectsTable.name,
    })
    .from(projectsTable);

  return new Response(
    JSON.stringify({
      projects,
    }),
    { status: 200 }
  );
}
