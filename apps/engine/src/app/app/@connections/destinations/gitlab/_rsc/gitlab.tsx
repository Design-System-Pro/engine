'use server';

import { GitlabCard } from '../_components/gitlab-card';

// eslint-disable-next-line @typescript-eslint/require-await
export async function Gitlab() {
  return <GitlabCard />;
}
