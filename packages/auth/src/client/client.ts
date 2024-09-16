import { createBrowserClient as createClient } from '@supabase/ssr';
import { env } from '@/config';

export function createBrowserClient<Database>(): ReturnType<
  typeof createClient<Database>
> {
  return createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}
