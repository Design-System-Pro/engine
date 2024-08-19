import { createEnv } from '@t3-oss/env-nextjs';
import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ENVIRONMENT: z.enum(['development', 'test', 'production']),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  emptyStringAsUndefined: true,
});

export default defineConfig({
  schemaFilter: ['public'],
  schema: './src/schema.ts',
  out: './src/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: review
    url: env.DATABASE_URL,
  },
  verbose: env.ENVIRONMENT === 'development',
  strict: true,
});
