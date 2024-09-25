const featureFlags = {
  shouldUpdateTokens: true,
} as Record<string, boolean>;

export const config = {
  API_HOST: import.meta.env.VITE_API_HOST,
  READ_INTERVAL: 1 * 1000, // 1 seconds
  CREDENTIALS_KEY: 'ds-pro__credentials',
  PROJECT_ID_KEY: 'ds-pro__id',
  features: featureFlags,
} as const;
