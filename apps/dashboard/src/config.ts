import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GITHUB_APP_ID: z.string().min(1),
    GITHUB_APP_PRIVATE_KEY: z.string().min(1),
    GITHUB_APP_CLIENT_ID: z.string().min(1),
    GITHUB_APP_CLIENT_SECRET: z.string().min(1),
    FIGMA_APP_CLIENT_ID: z.string().min(1),
    FIGMA_APP_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    ENVIRONMENT: z
      .enum(['development', 'test', 'production'])
      .default('production'),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_VERCEL_ENV: z
      .enum(['development', 'preview', 'production'])
      .optional(),
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1).optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  },
});

const pageUrl = (() => {
  switch (env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      return 'https://ds-project.tfrancisco.dev';
    case 'preview':
      return `https://${env.NEXT_PUBLIC_VERCEL_URL}`;
    default:
      return 'https://localhost:3000';
  }
})();

export const config = {
  environment: process.env.NODE_ENV,
  pageUrl,
  supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  FIGMA_KEY: 'figma.key',
  github: {
    appId: env.GITHUB_APP_ID,
    appPrivateKey: Buffer.from(env.GITHUB_APP_PRIVATE_KEY, 'base64').toString(
      'ascii'
    ),
    appClientId: env.GITHUB_APP_CLIENT_ID,
    appClientSecret: env.GITHUB_APP_CLIENT_SECRET,
  },
  databaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
  figma: {
    appClientId: env.FIGMA_APP_CLIENT_ID,
    appClientSecret: env.FIGMA_APP_CLIENT_SECRET,
    redirectUri: `${pageUrl}/integrations/providers/figma/callback`,
  },
  gitTokensPath: 'packages/generator/tokens',
} as const;
