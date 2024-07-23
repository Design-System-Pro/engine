import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { config } from '@/config';

export async function storeAuthToken(token: string): Promise<boolean> {
  const writeKey = cookies().get(config.WRITE_KEY)?.value;
  cookies().delete(config.WRITE_KEY);
  if (!writeKey) throw new Error('No write key provided');

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
      return true;
    }

    return false;
  }

  return false;
}
