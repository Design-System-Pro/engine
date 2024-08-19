import crypto from 'node:crypto';
import { kv } from '@vercel/kv';

export async function POST() {
  const readKey = crypto.randomBytes(64).toString('hex');
  const writeKey = crypto.randomBytes(64).toString('hex');

  if (
    await kv.set(
      writeKey,
      { readKey },
      {
        px: 5 * 60 * 1000, // Set the 5 minutes expire time, in milliseconds (a positive integer).
        nx: true, // Only set the key if it does not already exist.
      }
    )
  ) {
    return Response.json({ readKey, writeKey });
  }

  return new Response('Unexpected error', { status: 500 });
}
