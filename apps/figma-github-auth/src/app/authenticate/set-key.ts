"use server";

import { cookies } from "next/headers";

export async function setKey(key: string) {
  console.log("✨ set cookie", key);
  cookies().set("figma.key", key, {
    maxAge: 5 * 60, // 5 minutes
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: 5 * 60 * 1000, // 5 minutes
    path: "/",
  });
}
