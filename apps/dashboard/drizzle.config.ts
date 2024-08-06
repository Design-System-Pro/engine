import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

const {
  combinedEnv: { DATABASE_URL, NODE_ENV },
} = loadEnvConfig(process.cwd(), true, console);

export default defineConfig({
  schemaFilter: ['public'],
  schema: './src/lib/drizzle/schema.ts',
  out: './src/lib/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: review
    url: DATABASE_URL!,
  },
  verbose: NODE_ENV === 'development',
  strict: true,
});
