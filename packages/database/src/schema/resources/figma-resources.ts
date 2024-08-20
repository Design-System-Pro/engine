import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { Resources } from './resources';

export const figmaResourcesTable = pgTable('figma_resources', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  resourceId: uuid('resource_id')
    .references(() => Resources.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  name: text('name').notNull(),
});

export const insertFigmaResourcesSchema =
  createInsertSchema(figmaResourcesTable);
