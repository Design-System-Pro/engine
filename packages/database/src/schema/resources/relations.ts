import { relations } from 'drizzle-orm';
import { figmaResourcesTable } from './figma-resources';
import { Resources } from './resources';

export const FigmaResourcesRelations = relations(
  figmaResourcesTable,
  ({ one }) => ({
    resources: one(Resources, {
      fields: [figmaResourcesTable.resourceId],
      references: [Resources.id],
    }),
  })
);
