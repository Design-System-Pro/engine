'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { storeWriteKey } from './store';

function ReadStoreWriteKeyUnwrapped() {
  const searchParams = useSearchParams();
  const writeKey = searchParams.get('key');

  useEffect(() => {
    if (!writeKey) {
      // TODO: Review, For some reason, server action needs to be called with a then 🤷🏻‍♂️
      throw new Error('No write key provided');
    }

    void storeWriteKey(writeKey);
  }, [writeKey]);

  return null;
}

export function ReadStoreWriteKey() {
  return (
    <Suspense>
      <ReadStoreWriteKeyUnwrapped />
    </Suspense>
  );
}
