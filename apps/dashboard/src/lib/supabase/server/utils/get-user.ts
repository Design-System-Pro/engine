import type { NextRequest } from 'next/server';
import { createServerClient } from '../client';

export async function getUser(request?: NextRequest) {
  const authorizationHeader = request?.headers.get('Authorization');
  const authorizationToken = authorizationHeader?.replace('Bearer ', '');

  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(authorizationToken);

  return user;
}
