import type { NextRequest } from 'next/server';
import type { DesignTokens } from 'style-dictionary/types';
import { eq } from 'drizzle-orm';
import { database } from '@/lib/drizzle';
import { designSystemsTable, figmaFilesTable } from '@/lib/drizzle/schema';
import { pushFile } from '@/lib/github';
import { getUserAccount } from './get-user-account';

export async function updateDesignTokens(request: NextRequest) {
  const account = await getUserAccount(request);
  const { styleDictionary } = (await request.json()) as {
    styleDictionary?: DesignTokens;
  };

  if (!account || !styleDictionary) return;
  const designSystemId = account.designSystemId;
  if (!designSystemId) return;

  // TODO: review this logic because it needs validation and error handling
  await database
    .update(figmaFilesTable)
    .set({ designTokens: styleDictionary })
    .where(eq(designSystemsTable.id, designSystemId));

  const base64Content = btoa(JSON.stringify(styleDictionary, null, 2));
  await pushFile({
    content: base64Content,
    encoding: 'base64',
    name: 'tokens.json',
  });
}
