import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const designSystemsTable = pgTable('design_systems', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  tokens: json('tokens'),
});
