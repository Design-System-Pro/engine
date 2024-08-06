import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server/client';

export async function GET(req: NextRequest) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  });
}
