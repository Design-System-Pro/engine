'use server';

import { revalidatePath } from 'next/cache';

import { figmaFileSchema, figmaUrlRegex } from '../_schemas/schema';

import { database } from '@ds-project/database/client';
import {
  FigmaResources,
  insertFigmaResourcesSchema,
} from '@ds-project/database/schema';
import { api } from '@ds-project/api/rsc';

export async function registerFile(formData: FormData) {
  const validatedData = figmaFileSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const match = validatedData.url.match(figmaUrlRegex);
  const fileKey = match?.groups?.fileKey;

  if (!fileKey) throw new Error('No file key found in the figma url');

  const account = await api.accounts.current();

  if (!account) throw new Error('No account found');

  const validatedFigmaFile = insertFigmaResourcesSchema.parse({
    fileKey,
    ...validatedData,
  });

  await database.insert(FigmaResources).values(validatedFigmaFile);

  revalidatePath('/integrations/figma/files');
}
