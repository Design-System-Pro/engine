'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@ds-project/components/client';
import { Icons, Input, Button } from '@ds-project/components/server';
import { authAction } from '../_actions/auth.action';
import { ErrorMessage } from './error-message';
import { verifyOtpAction } from '../_actions/verify-otp.action';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@ds-project/components';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  otpToken: z
    .string()
    .min(6, {
      message: 'Your one-time password must be 6 characters.',
    })
    .optional(),
});

export const AuthForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<'signin' | 'verify'>('signin');
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      otpToken: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setError(undefined);

    if (stage === 'verify' && data.otpToken) {
      const result = await verifyOtpAction({
        email: data.email,
        token: data.otpToken,
      });

      if (result?.data?.ok) {
        router.replace(searchParams.get('next') ?? '/app');
      }

      if (result?.data?.error) {
        setError(result.data.error);
      }
    } else {
      const result = await authAction({
        email: data.email,
      });

      if (result?.data?.ok) {
        setStage('verify');
      }

      if (result?.data?.error) {
        setError(result.data.error);
      }
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem hidden={stage === 'verify'}>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otpToken"
          render={({ field }) => (
            <FormItem
              className={cn('flex flex-col items-center', {
                hidden: stage === 'signin',
              })}
            >
              <FormLabel>Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Message visible={signInFormState.data?.ok} /> */}
        <ErrorMessage
          error={
            form.formState.errors.email?.message ??
            form.formState.errors.otpToken?.message ??
            error
          }
        />

        <Button className="w-full" aria-disabled={loading} type="submit">
          <>
            {loading ? (
              <Icons.SymbolIcon className="mr-2 size-4 animate-spin" />
            ) : null}
            {loading
              ? 'Sending...'
              : stage === 'signin'
                ? 'Sign in with email'
                : 'Continue'}
          </>
        </Button>
      </form>
    </Form>
  );
};
