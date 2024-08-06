import { NextResponse } from 'next/server';
import type { MiddlewareFactory } from '../middleware';
import { middlewareSupabaseClient } from './server/middleware-client';

export const authenticationMiddleware: MiddlewareFactory =
  (middleware) =>
  async (request, event, response = NextResponse.next({ request })) => {
    const supabase = middlewareSupabaseClient(request, response);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/auth/callback') &&
      !request.nextUrl.pathname.startsWith('/auth/login') &&
      !request.nextUrl.pathname.startsWith('/auth/auth')
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/auth/login`;
      return middleware(
        request,
        event,
        NextResponse.redirect(url, { ...response, status: 307 })
      );
    }

    if (user && request.nextUrl.pathname.startsWith('/auth/login')) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return middleware(
        request,
        event,
        NextResponse.redirect(url, { ...response, status: 307 })
      );
    }

    return middleware(request, event, response);
  };
