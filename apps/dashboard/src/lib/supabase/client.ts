import { createBrowserClient } from '@supabase/ssr';
import { config } from '@/config';
import type { Database } from './database.generated.types';

export function createClient() {
  return createBrowserClient<Database>(
    config.supabaseUrl,
    config.supabaseAnonKey
  );
}
