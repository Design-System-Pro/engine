import type { createServerClient } from '@ds-project/auth/server';
import type { Database } from '@ds-project/database';
import { KeyHippo } from 'keyhippo';

export async function createApiKey({
  supabase,
  userId,
  description,
}: {
  supabase: ReturnType<typeof createServerClient<Database>>;
  userId: string;
  description: string;
}): Promise<Awaited<ReturnType<typeof KeyHippo.prototype.createApiKey>>> {
  const keyHippo = new KeyHippo(supabase);
  return await keyHippo.createApiKey(userId, description);
}
