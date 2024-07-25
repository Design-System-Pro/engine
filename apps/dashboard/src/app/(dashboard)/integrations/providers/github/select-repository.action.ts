'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/database';
import { integrationsTable } from '@/lib/database/schema';

export async function selectRepository(formData: FormData) {
  // TODO: zod validation here
  const installationId = parseInt(formData.get('installationId') as string);
  const repositoryId = parseInt(formData.get('repositoryId') as string);

  try {
    await database
      .update(integrationsTable)
      .set({
        repositoryId,
      })
      .where(eq(integrationsTable.installationId, installationId));
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error updating installation', error);
  }
}
