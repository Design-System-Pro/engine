import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DSLogo,
} from '@ds-project/components/server';
import Image from 'next/image';
import { Suspense } from 'react';
import { AuthForm } from './auth-form';
import authBackground from '../_assets/auth-bg.svg';

export function AuthCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="relative flex flex-col items-center">
        <Image
          src={authBackground}
          alt="auth background"
          className="absolute top-0"
        />
        <DSLogo width={64} height={64} className="z-10" />
        <CardTitle className="text-2xl" weight="normal">
          <h1>Sign in to DS</h1>
        </CardTitle>
        <CardDescription weight="light">
          <p>We'll email you a code for a password-free sign in.</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Suspense fallback={'Loading...'}>
          <AuthForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
