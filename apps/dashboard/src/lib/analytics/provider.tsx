'use client';

import { clientEnv } from '@/env/client-env';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}
export function AnalyticsProvider({
  children,
  enabled = false,
}: AnalyticsProviderProps) {
  useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      posthog.init(clientEnv.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: '/_proxy/posthog',
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
  }, [enabled]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
