import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { key: writeKey, token } = await request.json();

  const keyValue = await kv.getdel<{ readKey: string }>(writeKey);

  if (keyValue) {
    kv.set(keyValue.readKey, { token });
    return new Response("OK", { status: 200 });
  }

  return new Response("Not found", { status: 404 });
}
