'use server';

import { btoa } from 'node:buffer';
import type { DesignTokens } from 'style-dictionary/types';
import { revalidatePath } from 'next/cache';
import { pushFile } from '@/lib/github';

export async function updateTokens(newTokens: DesignTokens) {
  const base64Content = btoa(JSON.stringify(newTokens, null, 2));
  await pushFile({
    content: base64Content,
    encoding: 'base64',
    name: 'tokens.json',
  });

  revalidatePath('/tokens');
}
