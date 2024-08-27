import { NextResponse } from 'next/server';
import type { MiddlewareFactory } from '../middleware';
import { config } from '@/config';
import { createMiddlewareClient } from '@ds-project/auth/middleware';

export const authenticationMiddleware: MiddlewareFactory =
  (middleware) =>
  async (request, event, response = NextResponse.next({ request })) => {
    const supabase = createMiddlewareClient(request, response, {
      supabaseAnonKey: config.supabaseAnonKey,
      supabaseUrl: config.supabaseUrl,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/auth/callback') &&
      !request.nextUrl.pathname.startsWith('/auth/login') &&
      !request.nextUrl.pathname.startsWith('/auth/auth')
    ) {
      // Not logged in
      const url = request.nextUrl.clone();
      url.pathname = `/auth/login`;
      return middleware(
        request,
        event,
        NextResponse.redirect(url, { ...response, status: 307 })
      );
    }

    if (user && request.nextUrl.pathname.startsWith('/auth/login')) {
      // Logged in
      const url = request.nextUrl.clone();
      url.pathname = '/app';
      return middleware(
        request,
        event,
        NextResponse.redirect(url, { ...response, status: 307 })
      );
    }

    return middleware(request, event, response);
  };
