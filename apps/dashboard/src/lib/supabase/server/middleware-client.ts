import 'server-only';
import { createServerClient } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';
import type { Database } from '@ds-project/database';

export const middlewareSupabaseClient = (
  request: NextRequest,
  response: NextResponse
) =>
  createServerClient<Database>(config.supabaseUrl, config.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options: _ }) =>
          request.cookies.set(name, value)
        );
        cookiesToSet.forEach(({ name, value, options }) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- It should be fine to pass on options
          response.cookies.set(name, value, options)
        );
      },
    },
  });
