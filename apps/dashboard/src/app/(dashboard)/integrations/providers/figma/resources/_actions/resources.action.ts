import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { getDesignSystemId } from '@/lib/supabase/server/utils/get-design-system-id';

export async function getResources() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const designSystemId = await getDesignSystemId();

  if (!designSystemId)
    throw new Error('No design system associated with this account');

  return database.query.resourcesTable.findMany({
    where: (resources) => eq(resources.designSystemId, designSystemId),
  });
}
