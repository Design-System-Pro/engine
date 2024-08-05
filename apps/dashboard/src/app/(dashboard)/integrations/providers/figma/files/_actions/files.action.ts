import { eq } from 'drizzle-orm';
import { database } from '@/lib/database';
import { getDesignSystemId, isAuthenticated } from '@/lib/supabase/utils';

export async function getFiles() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const designSystemId = await getDesignSystemId();

  if (!designSystemId)
    throw new Error('No design system associated with this account');

  return database.query.figmaFilesTable.findMany({
    where: (figmaFile) => eq(figmaFile.designSystemId, designSystemId),
  });
}
