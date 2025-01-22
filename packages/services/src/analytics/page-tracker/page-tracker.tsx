'use client';

import dynamic from 'next/dynamic';

const TrackPageView = dynamic(
  () => import('./_track-page-view').then((module) => module.TrackPageView),
  {
    ssr: false,
  }
);

export const PageTracker = () => {
  return <TrackPageView />;
};
