import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const projectsTable = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull().default('Default Project'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});

export type SelectProjects = typeof projectsTable.$inferSelect;
