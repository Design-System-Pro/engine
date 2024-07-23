'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { getWriteKey, storeWriteKey } from './store';

function ReadStoreWriteKeyUnwrapped() {
  const searchParams = useSearchParams();
  const writeKey = searchParams.get('key');
  const router = useRouter();

  useEffect(() => {
    if (!writeKey) {
      void getWriteKey().then((key) => {
        if (!key) throw new Error('No write key provided');
      });
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
