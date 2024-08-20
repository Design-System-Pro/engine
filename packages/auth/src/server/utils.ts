import type { User } from '@supabase/supabase-js';
import { createServerClient } from './client';

export async function validateToken<Database>(
  authToken: string
): Promise<User | null> {
  const authClient = createServerClient<Database>();
  const {
    data: { user },
  } = await authClient.auth.getUser(authToken.replace('Bearer ', ''));

  return user;
}
