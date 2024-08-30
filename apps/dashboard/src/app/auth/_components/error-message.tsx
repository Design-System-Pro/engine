'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Icons,
} from '@ds-project/components';
import { AnimatePresence, motion } from 'framer-motion';

export const ErrorMessage = ({ error }: { error?: string }) => (
  <AnimatePresence>
    {error ? (
      <Alert asChild variant="destructive">
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <Icons.EnvelopeOpenIcon className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </motion.div>
      </Alert>
    ) : null}
  </AnimatePresence>
);
