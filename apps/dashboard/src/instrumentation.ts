import { serverEnv } from './env/server-env';

export async function register() {
  if (serverEnv.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }

  if (serverEnv.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}
