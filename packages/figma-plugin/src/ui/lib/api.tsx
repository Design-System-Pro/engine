import type { QueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import SuperJSON from 'superjson';

import { createQueryClient } from './query-client';
import type { AppRouter } from '@ds-project/api';
import { config } from '../config';
import { useAuth } from '../modules/providers/auth-provider';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const { accessToken } = useAuth();

  const trpcClient = useMemo(
    () =>
      api.createClient({
        links: [
          loggerLink({
            enabled: (op) =>
              // eslint-disable-next-line turbo/no-undeclared-env-vars
              process.env.NODE_ENV === 'development' ||
              (op.direction === 'down' && op.result instanceof Error),
          }),
          unstable_httpBatchStreamLink({
            transformer: SuperJSON,
            url: getBaseUrl() + '/api/v1',
            headers() {
              return {
                'x-trpc-source': 'figma-react',
                Authorization: `Bearer ${accessToken}`,
              };
            },
          }),
        ],
      }),
    [accessToken]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

const getBaseUrl = () => {
  // if (typeof window !== 'undefined') return window.location.origin;
  // // eslint-disable-next-line turbo/no-undeclared-env-vars
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return config.AUTH_API_HOST;
};