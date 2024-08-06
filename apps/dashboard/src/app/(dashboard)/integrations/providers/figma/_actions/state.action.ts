'use server';

import crypto from 'node:crypto';
import { kv } from '@vercel/kv';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function getState() {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const state = crypto.randomBytes(64).toString('hex');

  if (
    await kv.set(
      state,
      { state },
      {
        px: 5 * 60 * 1000, // Set the 5 minutes expire time, in milliseconds (a positive integer).
        nx: true, // Only set the key if it does not already exist.
      }
    )
  ) {
    return state;
  }

  return null;
}
