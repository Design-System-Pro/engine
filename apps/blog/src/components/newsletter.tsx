'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { subscribeToNewsletter } from '@/app/subscribe.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Subscribing...' : 'Subscribe'}
    </Button>
  );
}

export function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const result = await subscribeToNewsletter(formData);
    if (result.success) {
      toast.success(result.message);
      formRef.current?.reset();
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold">Newsletter</h2>
      <div className="rounded-lg border bg-card p-6">
        <p className="mb-4 text-muted-foreground">
          Subscribe to get notified when I publish new posts about design
          systems and frontend development.
        </p>
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1"
            aria-label="Email address"
          />
          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
