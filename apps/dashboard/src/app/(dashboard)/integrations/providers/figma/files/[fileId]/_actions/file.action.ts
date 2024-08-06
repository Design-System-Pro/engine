import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function getFile(fileId: string) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  return database.query.figmaFilesTable.findFirst({
    where: (figmaFile) => eq(figmaFile.id, fileId),
  });
}
