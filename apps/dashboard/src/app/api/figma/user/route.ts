import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const authorizationHeader = request.headers.get('Authorization');
  const authorizationToken = authorizationHeader?.replace('Bearer ', '');

  const supabase = createClient();
  // eslint-disable-next-line no-console -- TODO: review
  console.log({
    token: (await supabase.auth.getSession()).data.session?.access_token,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser(authorizationToken);

  return new Response(JSON.stringify({ user }), {
    status: 200,
  });
}
