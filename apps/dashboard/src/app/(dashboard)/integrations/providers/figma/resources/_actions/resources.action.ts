import { api } from '@/lib/trpc/server';

export async function getResources() {
  const project = await api.projects.current();

  if (!project?.id) throw new Error('No project associated with this account');

  return api.resources.byProjectId({ projectId: project.id });
}
