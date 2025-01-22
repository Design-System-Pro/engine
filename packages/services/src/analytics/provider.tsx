'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { clientEnv } from './env/client-env';

if (
  clientEnv.NEXT_PUBLIC_ARE_ANALYTICS_ENABLED &&
  typeof window !== 'undefined'
) {
  posthog.init(clientEnv.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: '/_proxy/a',
    ui_host: 'https://eu.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    loaded: (posthog) => {
      if (clientEnv.NEXT_PUBLIC_VERCEL_ENV === 'development')
        posthog.debug(true);
    },
  });
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
