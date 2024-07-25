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
}) => (
    <AnimatePresence>
      {visible ? (
        <Alert asChild variant="info">
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <Icons.EnvelopeOpenIcon className="size-4" />
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription>
              An email has been sent to {email} with a magic link.
            </AlertDescription>
          </motion.div>
        </Alert>
      ) : null}
    </AnimatePresence>
  );
