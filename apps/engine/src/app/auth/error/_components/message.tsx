'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Icons,
} from '@ds-project/components/server';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const MessageUnwrapped = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const _errorCode = searchParams.get('error_code');
  const errorDescription = searchParams.get('error_description');

  return (
    <AnimatePresence>
      {error ? (
        <Alert asChild variant="info">
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <Icons.EnvelopeOpenIcon className="size-4" />
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription>{errorDescription}</AlertDescription>
          </motion.div>
        </Alert>
      ) : null}
    </AnimatePresence>
  );
};

export function Message() {
  return (
    <Suspense>
      <MessageUnwrapped />
    </Suspense>
  );
}
