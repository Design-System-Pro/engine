import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server/client';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createServerClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    const accessToken = data.session?.access_token;
    if (!accessToken) {
      return NextResponse.redirect(`${origin}/auth/error`);
    }

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
