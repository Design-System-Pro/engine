/* eslint-disable no-restricted-properties */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { vercel } from '@t3-oss/env-core/presets';

export const serverEnv = createEnv({
  extends: [vercel()],
  isServer: typeof window === 'undefined',
  server: {
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    GITHUB_APP_ID: z.string().min(1),
    GITHUB_APP_PRIVATE_KEY: z.string().min(1),
    GITHUB_APP_CLIENT_ID: z.string().min(1),
    GITHUB_APP_CLIENT_SECRET: z.string().min(1),
    FIGMA_APP_CLIENT_ID: z.string().min(1),
    FIGMA_APP_CLIENT_SECRET: z.string().min(1),
    POSTGRES_URL: z.string().min(1),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string().min(1),
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),
    SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1),
    SEND_EMAIL_HOOK_SECRET: z.string().min(1),
    CRON_SECRET: z.string().min(1),
    // Feature Flags
    ENABLE_RELEASES_FLAG: z.coerce.boolean(),
  },
  experimental__runtimeEnv: process.env,
});
