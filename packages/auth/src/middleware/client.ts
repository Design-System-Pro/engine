import 'server-only';
import { createServerClient } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';

export const createMiddlewareClient = <Database>(
  request: NextRequest,
  response: NextResponse,
  credentials: {
    supabaseUrl: string;
    supabaseAnonKey: string;
  }
) =>
  createServerClient<Database>(
    credentials.supabaseUrl,
    credentials.supabaseAnonKey,
    {
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
    }
  );
