import { jsonb, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';

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
export const integrationsTable = pgTable('integrations', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  type: integrationTypeEnum('type').notNull().default('github'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  data: jsonb('data').$type<IntegrationData>(),
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
