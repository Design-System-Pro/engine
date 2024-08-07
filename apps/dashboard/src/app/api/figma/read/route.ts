import { kv } from '@vercel/kv';
import type { NextRequest } from 'next/server';
import type { KVCredentials } from '@/types/kv-types';

export async function POST(request: NextRequest) {
  const result = (await request.json()) as object;

  if (!('readKey' in result) || typeof result.readKey !== 'string') {
    // If the readKey is missing or not a string, return an empty response
    return Response.json({});
  }

  const credentials = await kv.getdel<KVCredentials>(result.readKey);

  if (credentials) {
    return Response.json(credentials);
  }

  // If the key doesn't exist, return an empty response
  return Response.json({});
}
