import { clientEnv } from './env/client-env';
import { serverEnv } from './env/server-env';

const pageUrl = (() => {
  switch (serverEnv.VERCEL_ENV) {
    case 'production':
      return 'https://getds.pro';
    case 'preview':
      return `https://${serverEnv.VERCEL_URL}`;
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
  figmaWidgetUrl: 'https://www.figma.com/community/widget/1415369860836124974',
} as const;
