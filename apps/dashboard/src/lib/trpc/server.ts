import { cache } from 'react';
import { headers } from 'next/headers';
import { createHydrationHelpers } from '@trpc/react-query/rsc';

import type { AppRouter } from '@ds-project/api';
import { createCaller, createTRPCContext } from '@ds-project/api';

import { createQueryClient } from './query-client';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const _headers = new Headers(headers());
  _headers.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    account: null,
    headers: _headers,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
