import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { Accounts } from './accounts';
export const ApiKeys = pgTable('api_keys', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  accountId: uuid('account_id')
    .references(() => Accounts.id, { onDelete: 'cascade' })
    .notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});

export type SelectApiKeys = typeof ApiKeys.$inferSelect;
