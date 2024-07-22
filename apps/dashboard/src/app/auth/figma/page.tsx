'use client';
import { useSearchParams } from 'next/navigation';
import { Icons } from '@ds-project/components';
import { useEffect } from 'react';
import { storeWriteKey } from './store';
import { MagicLinkForm } from './magic-link-form';

export default async function Page() {
  const searchParams = useSearchParams();
  const writeKey = searchParams.get('key');

  useEffect(() => {
    if (!writeKey) {
      // TODO: Review, For some reason, server action needs to be called with a then 🤷🏻‍♂️
      throw new Error('No write key provided');
    }

    storeWriteKey(writeKey).then();
  }, [writeKey]);

  return (
    <section className="flex max-w-sm flex-col items-center gap-6">
      <Icons.EnterIcon width={64} height={64} />
      <MagicLinkForm />
    </section>
  );
}
