'use client';

import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import type { TRPCLink } from '@trpc/client';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import SuperJSON from 'superjson';

import { createQueryClient } from './query-client';
import type { AppRouter } from './app-router';
import { useMemo } from 'react';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  source: string;
  accessToken?: string;
  trpcLinks?: TRPCLink<AppRouter>[];
  baseUrl: string;
}) {
  const queryClient = getQueryClient();

  const trpcClient = useMemo(
    () =>
      api.createClient({
        links: [
          ...(props.trpcLinks ?? []),
          loggerLink({
            enabled: (op) =>
              // eslint-disable-next-line turbo/no-undeclared-env-vars
              process.env.NODE_ENV === 'development' ||
              (op.direction === 'down' && op.result instanceof Error),
          }),
          unstable_httpBatchStreamLink({
            transformer: SuperJSON,
            url: `${props.baseUrl}/api/v1`,
            headers() {
              return {
                'x-trpc-source': props.source,
                ...(props.accessToken
                  ? { Authorization: `Bearer ${props.accessToken}` }
                  : {}),
              };
            },
          }),
        ],
      }),
    [props.accessToken, props.baseUrl, props.source, props.trpcLinks]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
