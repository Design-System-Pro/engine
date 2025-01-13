import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { Projects } from './projects';
import { Accounts } from './accounts';
import { Resources } from './resources';
import { Integrations } from './integrations';
import { usersTable } from './_auth/users';
import { Jobs } from './jobs';

export const ProjectsRelations = relations(Projects, ({ many }) => ({
  accountsToProjects: many(AccountsToProjects),
  resources: many(Resources),
  integrations: many(Integrations),
}));

export const AccountsRelations = relations(Accounts, ({ many, one }) => ({
  accountsToProjects: many(AccountsToProjects),
  jobs: many(Jobs),
  user: one(usersTable),
}));

export const AccountsToProjects = pgTable('accounts_to_projects', {
  accountId: uuid('account_id')
    .notNull()
    .references(() => Accounts.id, { onDelete: 'cascade' }),
  projectId: uuid('project_id')
    .notNull()
    .references(() => Projects.id, { onDelete: 'cascade' }),
});

export const AccountsToProjectsRelations = relations(
  AccountsToProjects,
  ({ one }) => ({
    account: one(Accounts, {
      fields: [AccountsToProjects.accountId],
      references: [Accounts.id],
    }),
    project: one(Projects, {
      fields: [AccountsToProjects.projectId],
      references: [Projects.id],
    }),
  })
);
export const IntegrationsRelations = relations(Integrations, ({ one }) => ({
  project: one(Projects, {
    fields: [Integrations.projectId],
    references: [Projects.id],
  }),
}));

export const JobsRelations = relations(Jobs, ({ one }) => ({
  account: one(Accounts, {
    fields: [Jobs.accountId],
    references: [Accounts.id],
  }),
}));
