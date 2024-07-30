import type { NextRequest } from 'next/server';
import { createClient } from './server';

export async function isAuthenticated(request: NextRequest) {
  const authorizationHeader = request.headers.get('Authorization');
  const authorizationToken = authorizationHeader?.replace('Bearer ', '');

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(authorizationToken);

  return Boolean(user);
}
