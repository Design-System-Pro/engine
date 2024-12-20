'use client';

import { createBrowserClient as createClient } from '@supabase/ssr';
import { env } from '@/config';

export function createBrowserClient<Database>(): ReturnType<
  typeof createClient<Database>
> {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
