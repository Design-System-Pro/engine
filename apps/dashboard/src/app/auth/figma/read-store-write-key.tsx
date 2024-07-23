'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { storeWriteKey } from './store';

function ReadStoreWriteKeyUnwrapped() {
  const searchParams = useSearchParams();
  const writeKey = searchParams.get('key');
  const router = useRouter();

  useEffect(() => {
    if (!writeKey) {
      // eslint-disable-next-line no-console -- TODO: Review
      console.warn('No write key provided. Redirecting to root.');
      router.push('/');
      return;
    }

    void storeWriteKey(writeKey);
    router.replace('/auth/figma');
  }, [router, writeKey]);

  return null;
}

export function ReadStoreWriteKey() {
  return (
    <Suspense>
      <ReadStoreWriteKeyUnwrapped />
    </Suspense>
  );
}
