'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Icons,
} from '@ds-project/components';
import { AnimatePresence, motion } from 'framer-motion';

export const Message = ({
  visible = false,
  email,
}: {
  visible?: boolean;
  email?: string;
}) => {
  return (
    <AnimatePresence>
      {visible ? (
        <Alert variant={'info'} asChild={true}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Icons.EnvelopeOpenIcon className="h-4 w-4" />
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription>
              An email has been sent to {email} with a magic link.
            </AlertDescription>
          </motion.div>
        </Alert>
      ) : null}
    </AnimatePresence>
  );
};
