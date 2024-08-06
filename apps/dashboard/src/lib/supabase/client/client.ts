import { createBrowserClient as createClient } from '@supabase/ssr';
import { config } from '@/config';
import type { Database } from '../__generated__/database.generated.types';

export function createBrowserClient() {
  return createClient<Database>(config.supabaseUrl, config.supabaseAnonKey);
}
