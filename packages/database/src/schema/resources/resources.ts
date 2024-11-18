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
import type { Group } from '@terrazzo/token-tools';

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
    designTokens: json('design_tokens').$type<Group>(),
  },
  (resource) => ({
    unique: unique().on(resource.name, resource.projectId),
  })
);

// TODO: improve design tokens validation when errors can be seen in the figma widget
export const InsertResourcesSchema = createInsertSchema(Resources);
