import { clientEnv } from './env/client';

const pageUrl = (() => {
  switch (clientEnv.NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      return 'https://getds.pro';
    case 'preview':
      return `https://${clientEnv.NEXT_PUBLIC_VERCEL_URL}`;
    default:
      return 'http://localhost:3000';
  }
})();

export const config = {
  pageUrl,
  FIGMA_KEY: 'figma.key',
  figmaRedirectUri: `${pageUrl}/integrations/providers/figma/callback`,
  gitTokensPath: 'packages/generator/tokens',
  discordInviteUrl: 'https://discord.gg/FQSYMapc76',
} as const;
