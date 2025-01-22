import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { vercel } from '@t3-oss/env-core/presets';

export const serverEnv = createEnv({
  extends: [vercel()],
  isServer: typeof window === 'undefined',
  server: {
    PLUNK_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
