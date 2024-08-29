import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env/client');
jiti('./src/env/server');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-alpha.figma.com',
        port: '',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/_proxy/posthog/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/_proxy/posthog/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },
  skipTrailingSlashRedirect: true,

  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@ds-project/database'],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
