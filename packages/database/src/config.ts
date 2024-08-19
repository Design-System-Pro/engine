import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
