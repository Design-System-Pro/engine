import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { readKey } = await request.json();

  const keyValue = await kv.getdel<{ token: string }>(readKey);

  if (keyValue) {
    return Response.json({ token: keyValue.token });
  }

  // If the key doesn't exist, return an empty response
  return Response.json({});
}
