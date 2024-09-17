import { clientEnv } from './env/client-env';

const pageUrl = (() => {
  switch (clientEnv.NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      return `https://${clientEnv.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
    case 'preview':
      return `https://${clientEnv.NEXT_PUBLIC_VERCEL_URL}`;
    default:
      return 'http://localhost:3000';
  }
})();

const isProduction = clientEnv.NEXT_PUBLIC_VERCEL_ENV === 'production';

/**
 * Config should not include secret environment variables
 */
export const config = {
  pageUrl,
  isProduction,
  areAnalyticsEnabled: isProduction,
  isSentryEnabled: isProduction,
  FIGMA_KEY: 'figma.key',
  figmaRedirectUri: `${pageUrl}/integrations/providers/figma/callback`,
  gitTokensPath: 'packages/generator/tokens',
  discordInviteUrl: 'https://discord.gg/FQSYMapc76',
  figmaWidgetUrl: 'https://www.figma.com/community/widget/1415369860836124974',
} as const;
