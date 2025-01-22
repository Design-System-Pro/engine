import { rewrites as getAnalyticsRewrites } from '@ds-project/services/analytics/rewrites.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  rewrites: getAnalyticsRewrites,
};

export default nextConfig;
