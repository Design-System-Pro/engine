'use server';

import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { getFigma } from '@/lib/figma';
import { figmaUrlRegex } from '../_schemas/schema';

export async function getFilePreview({ url }: { url: string }) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  try {
    const match = url.match(figmaUrlRegex);
    const fileKey = match?.groups?.fileKey;

    if (!fileKey) {
      throw new Error('No file key found in the figma url');
    }

    const figma = await getFigma();
    return await figma.getFile(fileKey);
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error parsing form data', error);
  }
}
