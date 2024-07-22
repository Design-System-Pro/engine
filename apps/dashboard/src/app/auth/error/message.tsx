'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Icons,
} from '@ds-project/components';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export const Message = ({}: {}) => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorCode = searchParams.get('error_code');
  const errorDescription = searchParams.get('error_description');

  return (
    <AnimatePresence>
      {error ? (
        <Alert variant={'info'} asChild={true}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Icons.EnvelopeOpenIcon className="h-4 w-4" />
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription>{errorDescription}</AlertDescription>
          </motion.div>
        </Alert>
      ) : null}
    </AnimatePresence>
  );
};
