'use server';

import { getFigma } from '@/lib/figma';
import { figmaUrlRegex } from '../_schemas/schema';

export async function getFilePreview({ url }: { url: string }) {
  try {
    const match = url.match(figmaUrlRegex);
    const fileKey = match?.groups?.fileKey;

    if (!fileKey) {
      throw new Error('No file key found in the figma url');
    }

    const figma = await getFigma();
    return await figma.getFile(fileKey);
  } catch (error) {
    console.error('Error parsing form data', error);
  }
}
