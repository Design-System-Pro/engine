const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
const githubAppId = process.env.GITHUB_APP_ID;
const githubAppPrivateKey = process.env.GITHUB_APP_PRIVATE_KEY;
const githubAppClientId = process.env.GITHUB_APP_CLIENT_ID;
const githubAppClientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
const figmaAppClientId = process.env.FIGMA_APP_CLIENT_ID;
const figmaAppClientSecret = process.env.FIGMA_APP_CLIENT_SECRET;
const databaseUrl = process.env.DATABASE_URL;

if (!supabaseUrl || !supabaseAnonKey)
  throw new Error('Missing Supabase credentials');

if (!databaseUrl) throw new Error('Missing Database URL');

if (
  !githubAppId ||
  !githubAppPrivateKey ||
  !githubAppClientId ||
  !githubAppClientSecret
)
  throw new Error('GitHub app credentials missing');

if (!figmaAppClientId || !figmaAppClientSecret)
  throw new Error('Figma app credentials missing');

const pageUrl = (() => {
  switch (vercelEnv) {
    case 'production':
      return 'https://ds-project.tfrancisco.dev';
    case 'preview':
      return `https://${vercelUrl}`;
    default:
      return 'https://localhost:3000';
  }
})();

export const config = {
  environment: process.env.NODE_ENV,
  pageUrl,
  supabaseUrl,
  supabaseAnonKey,
  FIGMA_KEY: 'figma.key',
  github: {
    appId: githubAppId,
    appPrivateKey: Buffer.from(githubAppPrivateKey, 'base64').toString('ascii'),
    appClientId: githubAppClientId,
    appClientSecret: githubAppClientSecret,
  },
  databaseUrl,
  figma: {
    appClientId: figmaAppClientId,
    appClientSecret: figmaAppClientSecret,
    redirectUri: `${pageUrl}/integrations/providers/figma/callback`,
  },
} as const;
