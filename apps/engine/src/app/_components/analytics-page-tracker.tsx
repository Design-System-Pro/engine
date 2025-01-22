'use client';

import dynamic from 'next/dynamic';

const AnalyticsPageView = dynamic(
  () =>
    import('@ds-project/services/analytics').then(
      (module) => module.AnalyticsPageView
    ),
  {
    ssr: false,
  }
);

export const AnalyticsTracker = () => {
  return <AnalyticsPageView />;
};
