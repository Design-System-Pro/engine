import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const { key: readKey } = await request.json();

  const keyValue = await kv.getdel<{ token: string }>(readKey);

  if (keyValue) {
    return Response.json({ token: keyValue.token });
  }

  return new Response("Not found", { status: 404 });
}
