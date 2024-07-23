import { kv } from '@vercel/kv';
import { deleteWriteKey, getWriteKey } from '@/app/auth/figma/store';

export async function storeAuthToken(token: string): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- It's expected to be async, but finally only accepts sync function
  const writeKey = await getWriteKey().finally(deleteWriteKey);
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
