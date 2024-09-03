import { accountsRouter } from './router/accounts';
import { apiKeysRouter } from './router/api-keys';
import { githubRouter } from './router/github';
import { integrationsRouter } from './router/integrations';
import { projectsRouter } from './router/projects';
import { resourcesRouter } from './router/resources';
import { usersRouter } from './router/users';
import { createTRPCRouter } from './trpc';
import { hippoKeysRouter } from './router/hippo-keys';

export const appRouter = createTRPCRouter({
  apiKeys: apiKeysRouter,
  hippoKeys: hippoKeysRouter,
  users: usersRouter,
  accounts: accountsRouter,
  integrations: integrationsRouter,
  resources: resourcesRouter,
  projects: projectsRouter,
  github: githubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
