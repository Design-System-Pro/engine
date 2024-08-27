'use server';

import { eq } from 'drizzle-orm';

import {
  integrationDataSchema,
  Integrations,
  integrationType,
} from '@ds-project/database/schema';
import { database } from '@ds-project/database/client';
import { createServerClient } from '@ds-project/auth/server';

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
      .update(Integrations)
      .set({
        data: validatedData,
      })
      .where(eq(Integrations.type, integrationType.Enum.github));
  } catch (error) {
    console.error('Error updating installation', error);
  }
}
