/* eslint-disable no-restricted-properties */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
  isServer: typeof window === 'undefined',
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    GITHUB_APP_ID: z.string().min(1),
    GITHUB_APP_PRIVATE_KEY: z.string().min(1),
    GITHUB_APP_CLIENT_ID: z.string().min(1),
    GITHUB_APP_CLIENT_SECRET: z.string().min(1),
    FIGMA_APP_CLIENT_ID: z.string().min(1),
    FIGMA_APP_CLIENT_SECRET: z.string().min(1),
    POSTGRES_URL: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
