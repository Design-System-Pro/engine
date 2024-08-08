'use server';

import { revalidatePath } from 'next/cache';
import { database } from '@/lib/drizzle';
import { figmaFilesTable, insertFigmaFileSchema } from '@/lib/drizzle/schema';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { getUserAccount } from '@/lib/supabase/server/utils/get-user-account';
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

  const validatedFigmaFile = insertFigmaFileSchema.parse({
    fileKey,
    ...validatedData,
  });

  await database.insert(figmaFilesTable).values(validatedFigmaFile);

  revalidatePath('/integrations/figma/files');
}
