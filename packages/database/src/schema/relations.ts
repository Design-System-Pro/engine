import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { projectsTable } from './projects';
import { accountsTable } from './accounts';
import { resourcesTable } from './resources';
import { integrationsTable } from './integrations';
import { usersTable } from './_auth/users';

export const projectsRelations = relations(projectsTable, ({ many }) => ({
  accountsToProjects: many(accountsToProjects),
  resources: many(resourcesTable),
  integrations: many(integrationsTable),
}));

export const accountsRelations = relations(accountsTable, ({ many, one }) => ({
  accountsToProjects: many(accountsToProjects),
  user: one(usersTable),
}));

export const accountsToProjects = pgTable('accounts_to_projects', {
  accountId: uuid('account_id')
    .notNull()
    .references(() => accountsTable.id, { onDelete: 'cascade' }),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projectsTable.id, { onDelete: 'cascade' }),
});

export const accountsToProjectsRelations = relations(
  accountsToProjects,
  ({ one }) => ({
    account: one(accountsTable, {
      fields: [accountsToProjects.accountId],
      references: [accountsTable.id],
    }),
    project: one(projectsTable, {
      fields: [accountsToProjects.projectId],
      references: [projectsTable.id],
    }),
  })
);

export const resourcesRelations = relations(resourcesTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [resourcesTable.projectId],
    references: [projectsTable.id],
  }),
}));

export const integrationsRelations = relations(
  integrationsTable,
  ({ one }) => ({
    project: one(projectsTable, {
      fields: [integrationsTable.projectId],
      references: [projectsTable.id],
    }),
  })
);
