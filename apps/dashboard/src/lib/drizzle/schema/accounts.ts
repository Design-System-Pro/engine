import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './_auth/users';

export const accountsTable = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
});
