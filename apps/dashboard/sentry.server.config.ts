// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { clientEnv } from '@/env/client';
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  enabled: clientEnv.NEXT_PUBLIC_VERCEL_ENV === 'production',
  dsn: 'https://bee796b3d7d7f0364e1dc326183331f0@o4507860870299648.ingest.de.sentry.io/4507860871872592',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
