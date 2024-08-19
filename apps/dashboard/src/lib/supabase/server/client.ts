import 'server-only';
import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { config } from '@/config';
import type { Database } from '@ds-project/database';

export function createServerClient() {
  const cookieStore = cookies();

  return createClient<Database>(config.supabaseUrl, config.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- It should be fine to pass on options
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
