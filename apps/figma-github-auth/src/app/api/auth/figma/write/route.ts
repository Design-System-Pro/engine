import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { key: writeKey, token } = await request.json();

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
      return new Response("OK", { status: 200 });
    }

    return new Response("Unexpected error", { status: 500 });
  }

  return new Response("Not found", { status: 404 });
}
