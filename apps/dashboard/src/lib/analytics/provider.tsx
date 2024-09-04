'use client';

import { clientEnv } from '@/env/client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (
  typeof window !== 'undefined' &&
  clientEnv.NEXT_PUBLIC_VERCEL_ENV === 'production'
) {
  posthog.init(clientEnv.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: '/_proxy/posthog/ingest',
    ui_host: 'https://eu.posthog.com',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  });
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
