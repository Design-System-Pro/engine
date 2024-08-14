import {
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { projectsTable } from './projects';

export const integrationTypeEnum = pgEnum('integration_type', [
  'github',
  'figma',
]);
export const integrationType = z.enum(integrationTypeEnum.enumValues);

export const githubIntegrationSchema = z.object({
  type: z.literal(integrationType.Enum.github),
  installationId: z.number(),
  repositoryId: z.number().optional(),
});

export const figmaIntegrationSchema = z.object({
  type: z.literal(integrationType.Enum.figma),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  userId: z.number(),
});

export const integrationDataSchema = z.union([
  githubIntegrationSchema,
  figmaIntegrationSchema,
]);

export type GithubIntegration = z.infer<typeof githubIntegrationSchema>;
export type FigmaIntegration = z.infer<typeof figmaIntegrationSchema>;
type IntegrationData = z.infer<typeof integrationDataSchema>;
export const integrationsTable = pgTable(
  'integrations',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    projectId: uuid('project_id')
      .references(() => projectsTable.id, { onDelete: 'cascade' })
      .notNull(),
    type: integrationTypeEnum('type').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    data: jsonb('data').$type<IntegrationData>(),
  },
  (integration) => ({
    unique: unique().on(integration.type, integration.projectId),
  })
);

export const integrationsTableSchema = createInsertSchema(integrationsTable, {
  data: () => integrationDataSchema,
});

export type SelectIntegration = typeof integrationsTable.$inferSelect;
export type SelectGithubIntegration = Omit<
  typeof integrationsTable.$inferSelect,
  'data'
> & {
  data: GithubIntegration;
};

export type SelectFigmaIntegration = Omit<
  typeof integrationsTable.$inferSelect,
  'data'
> & {
  data: FigmaIntegration;
};
