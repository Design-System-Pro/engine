'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { storeWriteKey } from './store';

/**
 * Responsible for handling Figma auth flow in case a figma key is provided to the login endpoint
 * @returns
 */
function AttemptFigmaAuth() {
  const searchParams = useSearchParams();
  const writeKey = searchParams.get('figma_key');
  const router = useRouter();

  useEffect(() => {
    if (!writeKey) {
      // eslint-disable-next-line no-console -- TODO: Review
      console.warn(
        'No write key provided. No figma authentication will be performed'
      );
      return;
    }

    void storeWriteKey(writeKey);
  }, [router, writeKey]);

  return null;
}

export function InitFigmaAuth() {
  return (
    <Suspense>
      <AttemptFigmaAuth />
    </Suspense>
  );
}
