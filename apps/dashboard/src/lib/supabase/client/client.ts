import { createBrowserClient as createClient } from '@supabase/ssr';
import { config } from '@/config';
import type { Database } from '@ds-project/database';

export function createBrowserClient() {
  return createClient<Database>(config.supabaseUrl, config.supabaseAnonKey);
}
