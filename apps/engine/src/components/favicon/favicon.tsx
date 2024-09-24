import { serverEnv } from '@/env/server-env';

export function Favicon() {
  const subpath = serverEnv.VERCEL_ENV === 'development' ? 'dev' : 'prod';
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/favicon/${subpath}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/favicon/${subpath}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/favicon/${subpath}/favicon-16x16.png`}
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}
