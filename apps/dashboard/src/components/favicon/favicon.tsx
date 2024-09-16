import { serverEnv } from '@/env/server-env';

export function Favicon() {
  return serverEnv.VERCEL_ENV === 'development' ? (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/dev/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/dev/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/dev/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/dev/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </>
  ) : (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/prod/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/prod/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/prod/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/prod/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}
