import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import Env from '@next/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

Env.loadEnvConfig(process.cwd());

const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

export const connection = postgres(env.POSTGRES_URL, {
  max: 1,
});
export const database = drizzle(connection, {
  schema,
  logger: env.NODE_ENV === 'development',
});
