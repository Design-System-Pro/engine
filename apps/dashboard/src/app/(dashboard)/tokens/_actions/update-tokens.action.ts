'use server';

import type { DesignTokens } from 'style-dictionary/types';
import { revalidatePath } from 'next/cache';
import { pushFile } from '@/lib/github';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { config } from '@/config';

export async function updateTokens(newTokens: DesignTokens) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const base64Content = btoa(JSON.stringify(newTokens, null, 2));
  await pushFile({
    content: base64Content,
    encoding: 'base64',
    name: `${config.gitTokensPath}/tokens.json`,
  });

  revalidatePath('/tokens');
}
