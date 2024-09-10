import { clientEnv } from './env/client';

const pageUrl = (() => {
  switch (clientEnv.VERCEL_ENV) {
    case 'production':
      return 'https://getds.pro';
    case 'preview':
      return `https://${clientEnv.VERCEL_URL}`;
    default:
      return 'http://localhost:3000';
  }
})();

export const config = {
  pageUrl,
  FIGMA_KEY: 'figma.key',
  figmaRedirectUri: `${pageUrl}/integrations/providers/figma/callback`,
  gitTokensPath: 'packages/generator/tokens',
} as const;
