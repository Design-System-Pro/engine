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
  FIGMA_QUERY_KEY: 'figma_key',
  FIGMA_COOKIE_KEY: 'figma.key',
  figmaRedirectUri: `${pageUrl}/app/sources/figma/callback`,
  defaultGitTokensPath: '',
  defaultTargetGitBranch: 'ds-pro/sync-tokens',
  defaultCommitMessage: 'feat(tokens): [ds-pro] 💅 Sync Tokens',
  communityInviteUrl: '/community',
  figmaWidgetUrl: 'https://www.figma.com/community/widget/1415369860836124974',
  feedbackUrl: '/feedback',
  githubUrl: 'https://github.com/Design-System-Pro',
  linkedinUrl: 'https://www.linkedin.com/company/design-system-pro',
  redditUrl: 'https://www.reddit.com/r/dspro',
  syncTokensVideoUrl:
    'https://www.loom.com/share/3b7d0f6092874932a606b2b9e163b3cf?sid=07f97a2f-99de-40cc-af2d-0ee434c004ad',
  supportEmail: 'tomas@getds.pro',
} as const;
