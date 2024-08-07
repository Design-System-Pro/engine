import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import type { DesignTokens } from 'style-dictionary/types';
import { designSystemsTable } from './design-systems';

export const tokensTable = pgTable('tokens', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  designSystemId: uuid('design_system_id')
    .references(() => designSystemsTable.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  name: text('name').notNull(),
  designTokens: json('design_tokens').$type<DesignTokens>(),
});

export const insertTokensSchema = createInsertSchema(tokensTable);
