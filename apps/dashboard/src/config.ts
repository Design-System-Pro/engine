export const config = {
  pageUrl: (() => {
    switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
      case 'production':
        // TODO: add production url
        return '';
      case 'preview':
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
      default:
        return 'http://localhost:3000';
    }
  })(),
} as const;
