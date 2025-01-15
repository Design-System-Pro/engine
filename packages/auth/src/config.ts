import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

export const env = createEnv({
  server: {
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
