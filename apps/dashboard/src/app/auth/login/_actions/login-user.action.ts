'use server';

import { z } from 'zod';
import { createServerClient } from '@ds-project/auth/server';
import type { Database } from '@ds-project/database';
import { config } from '@/config';

const schema = z.object({
  email: z.string().email(),
});

export async function loginUser(previousState: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = createServerClient<Database>();
  const { error } = await supabase.auth.signInWithOtp({
    email: validatedFields.data.email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${config.pageUrl}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }
  return {
    email: validatedFields.data.email,
    ok: true,
  };
}
