'use server';

import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { getUserAccount } from '@/lib/supabase/server/utils/get-user-account';
import { figmaFileSchema, figmaUrlRegex } from '../_schemas/schema';

import { database } from '@ds-project/database/client';
import {
  figmaResourcesTable,
  insertFigmaResourcesSchema,
} from '@ds-project/database/schema';

export async function registerFile(formData: FormData) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const validatedData = figmaFileSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const match = validatedData.url.match(figmaUrlRegex);
  const fileKey = match?.groups?.fileKey;

  if (!fileKey) throw new Error('No file key found in the figma url');

  const account = await getUserAccount();

  if (!account) throw new Error('No account found');

  const validatedFigmaFile = insertFigmaResourcesSchema.parse({
    fileKey,
    ...validatedData,
  });

  await database.insert(figmaResourcesTable).values(validatedFigmaFile);

  revalidatePath('/integrations/figma/files');
}
