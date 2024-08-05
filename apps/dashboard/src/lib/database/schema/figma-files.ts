import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { designSystemsTable } from './design-systems';

export const figmaFilesTable = pgTable('figma_files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  designSystemId: uuid('design_system_id')
    .references(() => designSystemsTable.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name'),
  fileKey: text('file_key').unique().notNull(),
  thumbnailUrl: text('thumbnail_url'),
  lastModified: timestamp('last_modified', {
    withTimezone: true,
    mode: 'string',
  }),
});

export const insertFigmaFileSchema = createInsertSchema(figmaFilesTable);
