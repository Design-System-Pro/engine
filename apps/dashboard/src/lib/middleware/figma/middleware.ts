import 'server-only';

import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import type { KVCredentials, KVCredentialsRead } from '@/types/kv-types';
import type { MiddlewareFactory } from '../compose';
import { createMiddlewareClient } from '@ds-project/auth/middleware';
import { clientEnv } from '@/env/client';
import { config } from '@/config';

export const figmaMiddleware: MiddlewareFactory =
  (middleware) =>
  async (request, event, response = NextResponse.next({ request })) => {
    if (request.nextUrl.pathname.startsWith('/auth/sign-in')) {
      console.log(
        '🔐 Figma: User is not logged in yet. Starting authentication...'
      );
      const figmaKey = request.nextUrl.searchParams.get('figma_key');

      if (!figmaKey) {
        console.log('🔐 Figma: Not Figma authentication. Skipping.');
        return middleware(request, event, response);
      }

      console.log(
        '🔐 Figma: Is Figma authentication. Starting authentication...'
      );

      const supabase = createMiddlewareClient(request, response, {
        supabaseAnonKey: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseUrl: clientEnv.NEXT_PUBLIC_SUPABASE_URL,
      });
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      const refreshToken = session?.refresh_token;
      const expiresAt = session?.expires_at;

      if (accessToken) {
        console.log('🔐 Figma: User is authenticated. Exchanging key...');
        const keyValue = await kv.getdel<KVCredentialsRead>(figmaKey);

        if (keyValue) {
          if (
            accessToken &&
            refreshToken &&
            expiresAt &&
            (await kv.set<KVCredentials>(
              keyValue.readKey,
              { accessToken, refreshToken, expiresAt },
              {
                px: 5 * 60 * 1000, // Set the 5 minutes expire time, in milliseconds (a positive integer).
                nx: true, // Only set the key if it does not already exist.
              }
            ))
          ) {
            response.cookies.delete(config.FIGMA_KEY);
            console.log('🔐 Figma: Key has been exchanged successfully.');
          } else {
            console.log('🔐 Figma: Failed to exchange key.');
          }
        }
      } else {
        response.cookies.set(config.FIGMA_KEY, figmaKey, {
          maxAge: 5 * 60, // 5 minutes
          expires: 5 * 60 * 1000, // 5 minutes
        });
        console.log(
          '🔐 Figma: User is not authenticated. 🍪 Stored Figma key.'
        );
      }

      return middleware(request, event, response);
    }

    // Possibly already logged in
    const figmaKey = request.cookies.get(config.FIGMA_KEY)?.value;

    if (!figmaKey) {
      return middleware(request, event, response);
    }

    console.log('🔐 Figma: Figma key detected. Finishing authentication...');

    const supabase = createMiddlewareClient(request, response, {
      supabaseAnonKey: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;
    const refreshToken = session?.refresh_token;
    const expiresAt = session?.expires_at;

    if (!accessToken) {
      console.log('🔐 Figma: User is not authenticated. Skipping.');
      return middleware(request, event, response);
    }

    const keyValue = await kv.getdel<KVCredentialsRead>(figmaKey);

    if (keyValue) {
      if (
        accessToken &&
        refreshToken &&
        expiresAt &&
        (await kv.set<KVCredentials>(
          keyValue.readKey,
          { accessToken, refreshToken, expiresAt },
          {
            px: 5 * 60 * 1000, // Set the 5 minutes expire time, in milliseconds (a positive integer).
            nx: true, // Only set the key if it does not already exist.
          }
        ))
      ) {
        response.cookies.delete(config.FIGMA_KEY);
        console.log('🔐 Figma: Key has been exchanged successfully.');
      } else {
        console.log('🔐 Figma: Failed to exchange key.');
      }
    }

    return middleware(request, event, response);
  };
