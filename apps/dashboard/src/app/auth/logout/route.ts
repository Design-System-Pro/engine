import { createServerClient } from '@ds-project/auth/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  // Make sure cache is invalidated so even if user visits any cached route, a new request is made to the server
  revalidatePath('/');

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  });
}
