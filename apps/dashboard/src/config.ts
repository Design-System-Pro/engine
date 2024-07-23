const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

if (!supabaseUrl || !supabaseAnonKey)
  throw new Error('Missing Supabase credentials');
export const config = {
  pageUrl: (() => {
    switch (vercelEnv) {
      case 'production':
        // TODO: add production url
        return '';
      case 'preview':
        return `https://${vercelUrl}`;
      default:
        return 'https://localhost:3000';
    }
  })(),
  supabaseUrl,
  supabaseAnonKey,
} as const;
