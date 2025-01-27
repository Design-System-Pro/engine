import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './_auth/users';
import { createSelectSchema } from 'drizzle-zod';

export const Accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  /**
   * The id of the user the account belongs to.
   * The id of the user is the same as the id of the user in the `users` table from `auth` schema.
   */
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  email: varchar('email').notNull(),
});

export type Account = typeof Accounts.$inferSelect;
export const SelectAccountsSchema = createSelectSchema(Accounts);
