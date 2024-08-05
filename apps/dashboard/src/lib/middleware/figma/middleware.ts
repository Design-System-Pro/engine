/* eslint-disable no-console -- TODO: replace with monitoring */
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { config } from '@/config';
import { middlewareSupabaseClient } from '@/lib/supabase/middleware-client';
import type { MiddlewareFactory } from '../compose';

export const figmaMiddleware: MiddlewareFactory =
  (middleware) =>
  async (request, event, response = NextResponse.next({ request })) => {
    if (request.nextUrl.pathname.startsWith('/auth/login')) {
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

      const supabase = middlewareSupabaseClient(request, response);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (token) {
        console.log('🔐 Figma: User is authenticated. Exchanging key...');
        const keyValue = await kv.getdel<{ readKey: string }>(figmaKey);

        if (keyValue) {
          if (
            await kv.set(
              keyValue.readKey,
              { token },
              {
                px: 5 * 60 * 1000, // Set the 5 minutes expire time, in milliseconds (a positive integer).
                nx: true, // Only set the key if it does not already exist.
              }
            )
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

    const supabase = middlewareSupabaseClient(request, response);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      console.log('🔐 Figma: User is not authenticated. Skipping.');
      return middleware(request, event, response);
    }

    const keyValue = await kv.getdel<{ readKey: string }>(figmaKey);

    if (keyValue) {
      if (
        await kv.set(
          keyValue.readKey,
          { token },
          {
            px: 5 * 60 * 1000, // Set the 5 minutes expire time, in milliseconds (a positive integer).
            nx: true, // Only set the key if it does not already exist.
          }
        )
      ) {
        response.cookies.delete(config.FIGMA_KEY);
        console.log('🔐 Figma: Key has been exchanged successfully.');
      } else {
        console.log('🔐 Figma: Failed to exchange key.');
      }
    }

    return middleware(request, event, response);
  };
