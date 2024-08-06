import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/lib/drizzle/schema';
import { config } from '@/config';

export const connection = postgres(config.databaseUrl, {
  max: 1,
});
export const database = drizzle(connection, {
  schema,
  logger: config.environment === 'development',
});
