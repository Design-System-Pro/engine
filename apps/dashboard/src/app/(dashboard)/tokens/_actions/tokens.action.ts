'use server';

import { getTokens } from '@/lib/database/utils';

export async function fetchTokens() {
  return getTokens();
}
