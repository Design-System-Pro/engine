import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("authjs.session-token");

  return new Response(`GH: ${token?.name}:${token?.value}`, {
    status: 200,
  });
}
