'use server';

import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { database } from '@ds-project/database/client';

export async function getResource(resourceId: string) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  return database.query.Resources.findFirst({
    where: (resource) => eq(resource.id, resourceId),
  });
}
