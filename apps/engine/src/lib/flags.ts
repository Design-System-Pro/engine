import { serverEnv } from '@/env/server-env';
import { unstable_flag as flag } from '@vercel/flags/next';
export const getShowReleasesFlag = flag({
  key: 'releases-feature',
  decide: () => serverEnv.ENABLE_RELEASES_FLAG,
});
