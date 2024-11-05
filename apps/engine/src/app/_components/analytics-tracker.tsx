'use client';

import dynamic from 'next/dynamic';

const AnalyticsPageView = dynamic(
  () =>
    import('./analytics-page-view').then((module) => module.AnalyticsPageView),
  {
    ssr: false,
  }
);

export const AnalyticsTracker = () => {
  return <AnalyticsPageView />;
};
