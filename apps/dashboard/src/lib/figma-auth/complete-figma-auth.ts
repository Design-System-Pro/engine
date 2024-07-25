import { kv } from '@vercel/kv';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';
import type { Database } from '../supabase/database.generated.types';

export async function completeFigmaAuth(
  supabase: SupabaseClient<Database>,
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  // eslint-disable-next-line no-console -- TODO: replace with monitoring
  console.log('🧩 Trying to complete figma auth...');
  const writeKey = request.cookies.get(config.WRITE_KEY)?.value;

  if (!writeKey) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.log('🤔 No figma key');
    return response;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const keyValue = await kv.getdel<{ readKey: string }>(writeKey);

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
      // eslint-disable-next-line no-console -- TODO: replace with monitoring
      console.log('🗑️ Cleaning up figma key. Successfully stored token.');
      response.cookies.delete(config.WRITE_KEY);
    }

    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.log('Failed to store token');
  }

  return response;
}
