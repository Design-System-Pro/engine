import { rewrites as getAnalyticsRewrites } from '@ds-project/services/analytics/rewrites.mjs';

/** @type {import('next').NextConfig['rewrites']} */
const rewrites = async () => {
  const analyticsRewrites = await getAnalyticsRewrites();
  return [...analyticsRewrites];
};

export { rewrites };
