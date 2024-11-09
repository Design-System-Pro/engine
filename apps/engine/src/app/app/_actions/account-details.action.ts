import { createServerClient } from '@ds-project/auth/server';

export async function getEmail() {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user.email;
}
