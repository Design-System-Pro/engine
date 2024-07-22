import { getWriteKey } from '@/app/auth/figma/store';
import { kv } from '@vercel/kv';

export async function storeAuthToken(token: string) {
  const writeKey = await getWriteKey();
  if (!writeKey) return new Response('No write key', { status: 500 });

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
      return new Response('OK', { status: 200 });
    }

    return new Response('Unexpected error', { status: 500 });
  }

  return new Response('Not found', { status: 404 });
}
