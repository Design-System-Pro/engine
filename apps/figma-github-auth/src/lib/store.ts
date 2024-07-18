"use server";

import { config } from "@/config";
import { cookies } from "next/headers";

const WRITE_KEY = "figma.key";

export async function setWriteKey(key: string): Promise<void> {
  cookies().set(WRITE_KEY, key, {
    maxAge: 5 * 60, // 5 minutes
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: 5 * 60 * 1000, // 5 minutes
    path: "/",
  });
}

export async function getWriteKey(): Promise<string | undefined> {
  return cookies().get(WRITE_KEY)?.value;
}

export async function setGhToken(token: string) {
  const writeKey = await getWriteKey();

  // TODO: Why doing with with fetch? I can do it directly here. Change it
  fetch(`${config.AUTH_API_URL}/figma/write`, {
    method: "POST",
    body: JSON.stringify({ writeKey, token }),
  });
}
