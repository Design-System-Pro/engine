import { relations } from 'drizzle-orm';
import { FigmaResources } from './figma-resources';
import { Resources } from './resources';
import { Projects } from '../projects';

export const FigmaResourcesRelations = relations(FigmaResources, ({ one }) => ({
  resources: one(Resources, {
    fields: [FigmaResources.resourceId],
    references: [Resources.id],
  }),
}));

export const ResourcesRelations = relations(Resources, ({ one }) => ({
  project: one(Projects, {
    fields: [Resources.projectId],
    references: [Projects.id],
  }),
}));
