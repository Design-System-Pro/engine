import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { config } from '@/config';
import { createApiKey } from '@ds-project/api/operations';
import type { KVCredentials, KVCredentialsRead } from '@/types/kv-types';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from '@ds-project/database';

export const getUrlFromResponse = (
  response: NextResponse,
  request: NextRequest
): URL => {
  return new URL(
    response.url !== '' ? response.url : request.nextUrl.toString()
  );
};

export const isAuthPath = (url: URL): boolean => {
  return (
    url.pathname === '/' ||
    url.pathname.startsWith('/auth/callback') ||
    url.pathname.startsWith('/auth/sign-in') ||
    url.pathname.startsWith('/auth/auth')
  );
};

export const isAuthenticatedPath = (url: URL): boolean => {
  return url.pathname.startsWith('/app');
};

export const isFigmaAuthPath = (url: URL): boolean => {
  return (
    url.pathname.startsWith('/auth/sign-in') &&
    url.searchParams.has(config.FIGMA_QUERY_KEY)
  );
};

export const hasOnGoingFigmaAuth = (request: NextRequest): boolean => {
  return request.cookies.has(config.FIGMA_COOKIE_KEY);
};

export const handleFigmaAuth = async ({
  request,
  response,
  supabase,
  url,
}: {
  request: NextRequest;
  response: NextResponse;
  url: URL;
  supabase: SupabaseClient<Database>;
}) => {
  const figmaKey = url.searchParams.get(config.FIGMA_QUERY_KEY);
  if (!figmaKey) {
    return response;
  }

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
  } else {
    response.cookies.set(config.FIGMA_COOKIE_KEY, figmaKey, {
      maxAge: 5 * 60,
      expires: 5 * 60 * 1000,
    });
    url.pathname = '/auth/sign-in';
    url.search = '';
    return NextResponse.redirect(url, { ...response, status: 307 });
  }
};

export const exchangeApiKey = async ({
  request,
  response,
  supabase,
  url,
  user,
}: {
  request: NextRequest;
  response: NextResponse;
  url: URL;
  user: User;
  supabase: SupabaseClient<Database>;
}) => {
  const figmaKey =
    request.cookies.get(config.FIGMA_COOKIE_KEY)?.value ??
    url.searchParams.get(config.FIGMA_QUERY_KEY);
  const keyValue = await kv.getdel<KVCredentialsRead>(figmaKey ?? '');

  if (!keyValue) {
    return response;
  }

  const apiKey = await createApiKey({
    supabase,
    userId: user.id,
    description: `Figma API Key - ${new Date().toISOString()}`,
  });

  if (apiKey.status !== 'success' || !apiKey.apiKey) {
    return response;
  }

  const setResult = await kv.set<KVCredentials>(
    keyValue.readKey,
    { apiKey: apiKey.apiKey },
    {
      px: 5 * 60 * 1000, // 5 minutes
      nx: true, // Do not overwrite if key already exists
    }
  );

  if (!setResult) {
    return response;
  }

  response.cookies.delete(config.FIGMA_COOKIE_KEY);
  url.pathname = '/auth/success';
  url.search = '';
  return NextResponse.redirect(url, { ...response, status: 307 });
};
