import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { env } from '../config';

import { createClient as createJsClient } from '@supabase/supabase-js';

export function createServerClient<Database>(): ReturnType<
  typeof createClient<Database>
> {
  const cookieStore = cookies();

  return createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options as ResponseCookie)
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

export function createServiceClient<Database>(): ReturnType<
  typeof createClient<Database>
> {
  return createJsClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );
}
