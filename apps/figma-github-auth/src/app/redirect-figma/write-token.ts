"use server";

import { cookies } from "next/headers";

export async function writeToken() {
  const cookieStore = cookies();
  const key = cookieStore.get("figma.key");
  const token = cookieStore.get("authjs.session-token");
  console.log("read cookie", { key, token });

  fetch("https://localhost:3000/api/auth/figma/write", {
    method: "PUT",
    body: JSON.stringify({ key: key?.value, token: token?.value }),
  });
}
