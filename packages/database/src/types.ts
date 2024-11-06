import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { database } from './client';
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import type * as schema from './schema';
import type { ExtractTablesWithRelations } from 'drizzle-orm';

export type DatabaseConnection = typeof database;
export type DatabaseTransaction = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
