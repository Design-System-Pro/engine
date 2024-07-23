import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const integrationsTable = pgTable('integrations', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  installationId: integer('installation_id').notNull(),
  repositoryId: integer('repository_id'),
});
