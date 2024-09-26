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
  return url.pathname === '/' || url.pathname.startsWith('/auth/sign-in');
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

export const hasOnGoingFigmaAuth = (url: URL): boolean => {
  return url.searchParams.has(config.FIGMA_QUERY_KEY);
};

export const handleFigmaAuth = async ({
  response,
  supabase,
  url,
}: {
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
    });
  } else {
    url.pathname = '/auth/sign-in';
    // Encode the next url which includes the figma key sign up page to return to after authentication
    url.search = `?next=${encodeURI(`${url.pathname}${url.search}`)}`;
    return NextResponse.redirect(url, { ...response, status: 307 });
  }
};

export const exchangeApiKey = async ({
  response,
  supabase,
  url,
  user,
}: {
  response: NextResponse;
  url: URL;
  user: User;
  supabase: SupabaseClient<Database>;
}) => {
  const figmaKey = url.searchParams.get(config.FIGMA_QUERY_KEY);

  if (!figmaKey) {
    return response;
  }

  const keyValue = await kv.getdel<KVCredentialsRead>(figmaKey);

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

  url.pathname = '/auth/success';
  // Remove the figma key from the url and any other query strings
  url.search = '';
  return NextResponse.redirect(url, { ...response, status: 307 });
};
