'use client';

import { Button, Icons } from '@ds-project/components';
// eslint-disable-next-line import/named -- TODO: Review
import { useFormStatus } from 'react-dom';

export const SubmitButton = () => {
  const formStatus = useFormStatus();

  return (
    <Button
      aria-disabled={formStatus.pending}
      aria-label="Get magic link"
      aria-pressed
      type="submit"
    >
      <>
        {formStatus.pending ? (
          <Icons.SymbolIcon className="mr-2 size-4 animate-spin" />
        ) : null}
        <Icons.Link2Icon className="mr-2 size-4" /> Get magic link
      </>
    </Button>
  );
};
