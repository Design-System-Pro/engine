import { api } from '@ds-project/api/rsc';

export async function getResources() {
  const project = await api.projects.getFirst();

  if (!project?.id) throw new Error('No project associated with this account');

  return api.resources.getByProjectId({ projectId: project.id });
}
