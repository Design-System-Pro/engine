'use server';

import { z } from 'zod';
import { config } from '@/config';
import { createClient } from '@/lib/supabase/server';

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

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: validatedFields.data.email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${config.pageUrl}/auth/callback`,
    },
  });

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return {
      error: error.message,
    };
  }
  return {
    email: validatedFields.data.email,
    ok: true,
  };
}
