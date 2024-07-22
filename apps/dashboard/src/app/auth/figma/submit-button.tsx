'use client';

import { useFormStatus } from 'react-dom';
import { Button, Icons } from '@ds-project/components';

export const SubmitButton = () => {
  const formStatus = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={formStatus.pending}
      aria-pressed={true}
      aria-label="Get magic link"
    >
      <>
        {formStatus.pending ? (
          <Icons.SymbolIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        <Icons.Link2Icon className="mr-2 h-4 w-4" /> Get magic link
      </>
    </Button>
  );
};
