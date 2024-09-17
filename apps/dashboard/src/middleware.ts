import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@ds-project/auth/middleware';
import {
  handleFigmaAuth,
  exchangeApiKey,
  isAuthPath,
  isAuthenticatedPath,
  isFigmaAuthPath,
  hasOnGoingFigmaAuth,
} from './lib/middleware/utils';
import { serverEnv } from './env/server-env';

export const config = {
  /**
   * Match all paths except for:
   * 1. /api/ routes
   * 2. /_next/ (Next.js internals)
   * 3. /_proxy/m (Monitoring - Sentry proxy)
   * 4. /_proxy/a (Analytics - PostHog proxy)
   * 5. /*.* (static files like /favicon.ico, /sitemap.xml, /robots.txt, etc.)
   */
  matcher: ['/((?!api/|_next/|_proxy/m|_proxy/a|[\\w-]+\\.\\w+).*)'],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const url = request.nextUrl.clone();

  const supabase = createMiddlewareClient(request, response, {
    supabaseAnonKey: serverEnv.SUPABASE_ANON_KEY,
    supabaseUrl: serverEnv.SUPABASE_URL,
  });

  // Figma middleware logic
  if (isFigmaAuthPath(url)) {
    return handleFigmaAuth({ request, response, url, supabase });
  }

  if (hasOnGoingFigmaAuth(request)) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return exchangeApiKey({
        response,
        url,
        user,
        supabase,
        request,
      });
    }
  }

  // Auth middleware logic
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isAuthPath(url) && !isAuthenticatedPath(url)) {
    url.pathname = '/auth/sign-in';
    return NextResponse.redirect(url, { ...response, status: 307 });
  }

  if (user && url.pathname.startsWith('/auth/sign-in')) {
    url.pathname = '/app';
    return NextResponse.redirect(url, { ...response, status: 307 });
  }

  return response;
}
