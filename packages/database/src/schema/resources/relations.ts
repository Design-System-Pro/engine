import { relations } from 'drizzle-orm';
import { FigmaResources } from './figma-resources';
import { Resources } from './resources';

export const FigmaResourcesRelations = relations(FigmaResources, ({ one }) => ({
  resources: one(Resources, {
    fields: [FigmaResources.resourceId],
    references: [Resources.id],
  }),
}));
