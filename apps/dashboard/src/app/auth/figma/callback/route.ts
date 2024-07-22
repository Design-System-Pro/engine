import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { storeAuthToken } from '../store-auth-token';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    const accessToken = data.session?.access_token;
    if (!accessToken) {
      return NextResponse.redirect(`${origin}/auth/error`);
    }

    storeAuthToken(accessToken);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
