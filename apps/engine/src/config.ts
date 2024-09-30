import { clientEnv } from './env/client-env';

const pageUrl = (() => {
  switch (clientEnv.NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      return `https://${clientEnv.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
    case 'preview':
      return `https://${clientEnv.NEXT_PUBLIC_VERCEL_URL}`;
    default:
      return 'https://localhost:3000';
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
  FIGMA_QUERY_KEY: 'figma_key',
  FIGMA_COOKIE_KEY: 'figma.key',
  figmaRedirectUri: `${pageUrl}/integrations/inputs/figma/callback`,
  defaultGitTokensPath: 'packages/generator/tokens',
  defaultTargetGitBranch: 'ds-project/sync-tokens',
  discordInviteUrl: 'https://discord.gg/FQSYMapc76',
  figmaWidgetUrl: 'https://www.figma.com/community/widget/1415369860836124974',
  feedbackUrl: 'https://ds-project.supahub.com',
  githubUrl: 'https://github.com/Design-System-Pro',
  linkedinUrl: 'https://www.linkedin.com/company/design-system-pro',
  supportEmail: 'tomas@getds.pro',
} as const;
