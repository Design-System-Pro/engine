import { withSentryConfig } from '@sentry/nextjs';
import createMDX from '@next/mdx';
import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
const jiti = createJiti(fileURLToPath(import.meta.url));
import { rewrites } from './src/lib/rewrites.mjs';
import { headers } from './src/lib/headers.mjs';

jiti('./src/env/client-env');
const { serverEnv } = jiti('./src/env/server-env');

/** @type {import('next').NextConfig} */
const baseNextConfig = {
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-alpha.figma.com',
        port: '',
      },
    ],
  },

  headers,

  rewrites,

  async redirects() {
    return [
      {
        source: '/community',
        destination: 'https://discord.gg/FQSYMapc76',
        permanent: false,
      },
      {
        source: '/feedback',
        destination: 'https://ds-project.supahub.com',
        permanent: false,
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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const combinedNextConfig = withMDX(baseNextConfig);

export default withSentryConfig(combinedNextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: serverEnv.SENTRY_ORG,
  project: serverEnv.SENTRY_PROJECT,

  authToken: serverEnv.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/_proxy/m',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  sourcemaps: {
    // Only upload source maps in production
    disable: serverEnv.VERCEL_ENV !== 'production',
  },
});
