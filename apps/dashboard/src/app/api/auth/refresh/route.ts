import { createServerClient } from '@ds-project/auth/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const result = (await request.json()) as { refreshToken: string };

  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.refreshSession({
    refresh_token: result.refreshToken,
  });

  const accessToken = session?.access_token;
  const refreshToken = session?.refresh_token;
  const expiresAt = session?.expires_at;

  return new Response(
    JSON.stringify({ accessToken, refreshToken, expiresAt }),
    { status: 200 }
  );
}
