'use client';

import { useFormStatus } from 'react-dom';
import { Button, Icons } from '@ds-project/components';

export const SubmitButton = () => {
  const formStatus = useFormStatus();

  return (
    <Button
      className="w-full"
      aria-disabled={formStatus.pending}
      aria-label="Get magic link"
      aria-pressed
      type="submit"
    >
      <>
        {formStatus.pending ? (
          <Icons.SymbolIcon className="mr-2 size-4 animate-spin" />
        ) : null}
        Login
      </>
    </Button>
  );
};
