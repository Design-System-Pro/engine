'use client';

import { Button } from '@ds-project/components';
import { createBrowserClient } from '@ds-project/auth/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';

export function DashboardLink() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setHasSession(session !== null);
      })
      .catch(() => {
        Sentry.captureException(new Error('Failed to get session'));
      });
  }, []);

  return (
    <Button variant="ghost" asChild>
      <Link href="/auth/sign-in">{hasSession ? 'Dashboard' : 'Sign in'}</Link>
    </Button>
  );
}
