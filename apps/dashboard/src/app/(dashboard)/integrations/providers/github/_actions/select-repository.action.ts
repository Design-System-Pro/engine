'use server';

import { eq } from 'drizzle-orm';

import { createServerClient } from '@/lib/supabase/server/client';
import {
  integrationDataSchema,
  integrationsTable,
  integrationType,
} from '@ds-project/database/schema';
import { database } from '@ds-project/database/client';

export async function selectRepository(formData: FormData) {
  const supabase = createServerClient();
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
