'use server';

import { revalidatePath } from 'next/cache';
import {
  getDesignSystemId,
  getUserAccount,
  isAuthenticated,
} from '@/lib/supabase/utils';
import { database } from '@/lib/database';
import { figmaFilesTable, insertFigmaFileSchema } from '@/lib/database/schema';
import { figmaFileSchema, figmaUrlRegex } from '../_schemas/schema';

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

  const designSystemId = await getDesignSystemId();

  const validatedFigmaFile = insertFigmaFileSchema.parse({
    fileKey,
    designSystemId,
    ...validatedData,
  });

  await database.insert(figmaFilesTable).values(validatedFigmaFile);

  revalidatePath('/integrations/figma/files');
}
