'use client';

import { useFormState } from 'react-dom';
import { loginUser } from './login-user.action';
import { Message } from './message';
import { SubmitButton } from './submit-button';
import { Input, Label } from '@ds-project/components';

export const MagicLinkForm = () => {
  const [state, formAction] = useFormState(loginUser, {
    errors: { email: undefined },
  });

  return (
    <>
      <form action={formAction} className="flex flex-col space-y-8">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          required={true}
          placeholder="you@example.com"
        />
        <p>Sign in instantly by getting a magic link sent to your email</p>

        <SubmitButton />

        <Message visible={state.ok} email={state.email} />
      </form>
    </>
  );
};
