import { json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import type { DesignTokens, DesignToken } from 'style-dictionary/types';
import { z } from 'zod';
import { projectsTable } from '../projects';

// DesignToken schema
const DesignTokenSchema = z
  .object({
    value: z.any().optional(),
    $value: z.any().optional(),
    type: z.string().optional(),
    $type: z.string().optional(),
    $description: z.string().optional(),
    name: z.string().optional(),
    comment: z.string().optional(),
    themeable: z.boolean().optional(),
    attributes: z.record(z.unknown()).optional(),
    // Allow any additional properties
  })
  .catchall(z.any());

// DesignTokens schema
const DesignTokensSchema: z.ZodType<DesignTokens> = z.lazy(() =>
  z
    .object({
      $type: z.string().optional(),
      // Allow nesting of DesignTokens or DesignToken
    })
    .catchall(
      z.union([
        DesignTokenSchema,
        DesignTokensSchema,
        z.string(),
        z.undefined(),
      ])
    )
);

// PreprocessedTokens schema
const PreprocessedTokensSchema: z.ZodType<DesignToken | DesignTokens> = z.lazy(
  () => z.union([DesignTokenSchema, PreprocessedTokensSchema])
);

/**
 * Represents the resources linked to a design system.
 */
export const Resources = pgTable('resources', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
  projectId: uuid('project_id')
    .references(() => projectsTable.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  name: text('name').notNull(),
  designTokens:
    json('design_tokens').$type<z.infer<typeof DesignTokensSchema>>(),
});

export const InsertResourcesSchema = createInsertSchema(Resources, {
  designTokens: () => PreprocessedTokensSchema,
});
