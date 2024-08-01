import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const integrationTypeEnum = pgEnum('integration_type', ['github']);
export const integrationType = z.enum(integrationTypeEnum.enumValues);
export const integrationsTable = pgTable('integrations', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  type: integrationTypeEnum('type').notNull().default('github'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  installationId: integer('installation_id').notNull(),
  repositoryId: integer('repository_id'),
});

export type SelectIntegration = typeof integrationsTable.$inferSelect;
