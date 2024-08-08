'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function getResource(resourceId: string) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  return database.query.resourcesTable.findFirst({
    where: (resource) => eq(resource.id, resourceId),
  });
}
