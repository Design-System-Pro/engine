'use client';

import { useFormState } from 'react-dom';
import { CardContent, CardFooter, Input, Label } from '@ds-project/components';
import { loginUser } from '../_actions';
import { Message } from './message';
import { SubmitButton } from './submit-button';

export const MagicLinkForm = () => {
  const [state, formAction] = useFormState(loginUser, {
    errors: { email: undefined },
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <CardContent className="grid gap-4">
        <Label>Email</Label>
        <Input
          autoComplete="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </CardContent>
      <CardFooter>
        <Message email={state.email} visible={state.ok} />
        {!state.ok ? <SubmitButton /> : null}
      </CardFooter>
    </form>
  );
};
