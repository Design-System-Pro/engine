export async function register() {
  if (typeof globalThis.EdgeRuntime !== 'string') {
    await import('../sentry.server.config');
  } else {
    await import('../sentry.edge.config');
  }
}
