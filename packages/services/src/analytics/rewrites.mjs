/** @type {import('next').NextConfig['rewrites']} */
const rewrites = async () => {
  return [
    {
      source: '/_proxy/a/static/:path*',
      destination: 'https://eu-assets.i.posthog.com/static/:path*',
    },
    {
      source: '/_proxy/a/:path*',
      destination: 'https://eu.i.posthog.com/:path*',
    },
  ];
};

export { rewrites };
