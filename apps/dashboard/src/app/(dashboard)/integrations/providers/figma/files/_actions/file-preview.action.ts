'use server';

import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { figma } from '@/lib/figma';
import { database } from '@/lib/drizzle';
import { integrationType } from '@/lib/drizzle/schema';
import { figmaUrlRegex } from '../_schemas/schema';

export async function getFilePreview({ url }: { url: string }) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  try {
    const figmaIntegrations = await database.query.integrationsTable.findFirst({
      where: (integrations) =>
        eq(integrations.type, integrationType.Enum.figma),
    });

    if (
      figmaIntegrations?.type !== integrationType.Enum.figma ||
      figmaIntegrations.data?.type !== integrationType.Enum.figma
    ) {
      throw new Error('No figma integration found');
    }

    const match = url.match(figmaUrlRegex);
    const fileKey = match?.groups?.fileKey;

    if (!fileKey) {
      throw new Error('No file key found in the figma url');
    }

    return await figma.getFile(fileKey, figmaIntegrations.data.accessToken);
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error parsing form data', error);
  }
}
