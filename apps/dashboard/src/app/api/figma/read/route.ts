import { kv } from '@vercel/kv';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const result = (await request.json()) as object;

  if (!('readKey' in result) || typeof result.readKey !== 'string') {
    // If the readKey is missing or not a string, return an empty response
    return Response.json({});
  }

  const keyValue = await kv.getdel<{ token: string }>(result.readKey);

  if (keyValue) {
    return Response.json({ token: keyValue.token });
  }

  // If the key doesn't exist, return an empty response
  return Response.json({});
}
