const featureFlags = {
  shouldUpdateTokens: true,
} as Record<string, boolean>;

export const config = {
  HOST_URL: import.meta.env.VITE_HOST_URL,
  API_KEY_READ_INTERVAL: 2 * 1000, // 2 seconds
  CREDENTIALS_KEY: 'ds-pro__credentials',
  PROJECT_ID_KEY: 'ds-pro__id',
  features: featureFlags,
} as const;
