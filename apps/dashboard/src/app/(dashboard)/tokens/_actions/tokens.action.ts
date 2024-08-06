'use server';

import { getTokens } from '@/lib/drizzle/utils';

export async function fetchTokens() {
  return getTokens();
}
