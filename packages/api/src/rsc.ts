import { cache } from 'react';
import { headers } from 'next/headers';
import { createHydrationHelpers } from '@trpc/react-query/rsc';

import { createQueryClient } from './query-client';
import { createTRPCContext } from './trpc';
import type { AppRouter } from '.';
import { createCaller } from '.';

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
