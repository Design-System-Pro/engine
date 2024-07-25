'use client';

// eslint-disable-next-line import/named -- TODO: Review
import { useFormState } from 'react-dom';
import { Input, Label } from '@ds-project/components';
import { loginUser } from './login-user.action';
import { Message } from './message';
import { SubmitButton } from './submit-button';

export const MagicLinkForm = () => {
  const [state, formAction] = useFormState(loginUser, {
    errors: { email: undefined },
  });

  return (
    <form action={formAction} className="flex flex-col space-y-8">
      <Label>Email</Label>
      <Input
        autoComplete="email"
        name="email"
        placeholder="you@example.com"
        required
        type="email"
      />
      <p>Sign in instantly by getting a magic link sent to your email</p>

      <SubmitButton />

      <Message email={state.email} visible={state.ok} />
    </form>
  );
};
