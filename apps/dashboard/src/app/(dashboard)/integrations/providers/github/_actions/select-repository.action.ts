'use server';

import { eq } from 'drizzle-orm';
import { database } from '@/lib/database';
import {
  integrationDataSchema,
  integrationsTable,
  integrationType,
} from '@/lib/database/schema';
import { createClient } from '@/lib/supabase/server';

export async function selectRepository(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // TODO: zod validation here
  const installationId = parseInt(formData.get('installationId') as string);
  const repositoryId = parseInt(formData.get('repositoryId') as string);

  const validatedData = integrationDataSchema.parse({
    type: integrationType.enum.github,
    installationId,
    repositoryId,
  });

  try {
    await database
      .update(integrationsTable)
      .set({
        data: validatedData,
      })
      .where(eq(integrationsTable.type, integrationType.Enum.github));
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error updating installation', error);
  }
}
