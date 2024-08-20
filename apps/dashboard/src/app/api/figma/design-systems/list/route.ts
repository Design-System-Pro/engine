import { database } from '@ds-project/database/client';
import { Projects } from '@ds-project/database/schema';
import { api } from '@/lib/trpc/server';

export async function GET() {
  const project = await api.projects.current();

  if (!project?.id) {
    return new Response('No project associated with this account', {
      status: 404,
    });
  }

  const projects = await database
    .select({
      id: Projects.id,
      name: Projects.name,
    })
    .from(Projects);

  return new Response(
    JSON.stringify({
      projects,
    }),
    { status: 200 }
  );
}
