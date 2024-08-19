import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ENVIRONMENT: z.enum(['development', 'test', 'production']),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
