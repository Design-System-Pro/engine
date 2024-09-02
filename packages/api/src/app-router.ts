import { accountsRouter } from './router/accounts';
import { authRouter } from './router/auth';
import { githubRouter } from './router/github';
import { integrationsRouter } from './router/integrations';
import { projectsRouter } from './router/projects';
import { resourcesRouter } from './router/resources';
import { usersRouter } from './router/users';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: usersRouter,
  accounts: accountsRouter,
  integrations: integrationsRouter,
  resources: resourcesRouter,
  projects: projectsRouter,
  github: githubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
