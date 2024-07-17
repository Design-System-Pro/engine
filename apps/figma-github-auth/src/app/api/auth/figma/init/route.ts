import { kv } from "@vercel/kv";
import crypto from "crypto";

export function POST() {
  const readKey = crypto.randomBytes(64).toString("hex");
  const writeKey = crypto.randomBytes(64).toString("hex");

  kv.set(writeKey, { readKey });

  return Response.json({ readKey, writeKey });
}
