const featureFlags = {
  shouldUpdateTokens: true,
} as Record<string, boolean>;

export const config = {
  AUTH_API_HOST: 'http://localhost:3000',
  READ_INTERVAL: 1 * 1000, // 1 seconds
  CREDENTIALS_KEY: 'ds-project-credentials',
  PROJECT_ID_KEY: 'ds-project-id',
  features: featureFlags,
} as const;
