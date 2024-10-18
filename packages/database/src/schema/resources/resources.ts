import {
  json,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { Projects } from '../projects';
import type { JSONTokenTree } from 'design-tokens-format-module';
import { parseJSONTokenTree } from '@nclsndr/design-tokens-library';
export const PreprocessedTokensSchema = {
  parse: (jsonTokenTree: unknown): JSONTokenTree => {
    const tokenTree = parseJSONTokenTree(jsonTokenTree, { throwOnError: true });
    return tokenTree.toJSON() satisfies JSONTokenTree;
  },
};

/**
 * Represents the resources linked to a design system.
 */
export const Resources = pgTable(
  'resources',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date().toISOString()),
    projectId: uuid('project_id')
      .references(() => Projects.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name').notNull(),
    designTokens: json('design_tokens').$type<JSONTokenTree>(),
  },
  (resource) => ({
    unique: unique().on(resource.name, resource.projectId),
  })
);

export const InsertResourcesSchema = createInsertSchema(Resources);
