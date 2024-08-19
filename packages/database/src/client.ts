import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from './config';
export const connection = postgres(env.POSTGRES_URL, {
  max: 1,
});
export const database = drizzle(connection, {
  schema,
  logger: env.NODE_ENV === 'development',
});
