import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { getProjectId } from '@/lib/supabase/server/utils/get-project-id';
import { database } from '@ds-project/database/client';

export async function getResources() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const projectId = await getProjectId();

  if (!projectId) throw new Error('No project associated with this account');

  return database.query.Resources.findMany({
    with: {
      project: {
        with: {
          resources: true,
          accountsToProjects: {
            where: (accountsToProjects) =>
              eq(accountsToProjects.projectId, projectId),
          },
        },
      },
    },
  });
}
