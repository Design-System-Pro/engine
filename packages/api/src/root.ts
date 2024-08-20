import { resourcesRouter } from './router/resources';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  resources: resourcesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
