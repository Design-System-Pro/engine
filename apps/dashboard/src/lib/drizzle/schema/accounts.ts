import { pgSchema, pgTable, serial, uuid } from 'drizzle-orm/pg-core';
import { designSystemsTable } from './design-systems';

const authSchema = pgSchema('auth');

const usersTable = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const accountsTable = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  designSystemId: uuid('design_system_id').references(
    () => designSystemsTable.id,
    { onDelete: 'cascade' }
  ),
});
