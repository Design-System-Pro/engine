import type { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type AppMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (middleware: AppMiddleware) => AppMiddleware;

/**
 * Chain multiple middleware functions together
 * @param functions - An array of middleware functions
 * @param index - The current index of the middleware function to call
 * @returns
 */
export const compose = (
  functions: MiddlewareFactory[],
  index = 0
): AppMiddleware => {
  const current = functions.at(index);

  if (current) {
    const next = compose(functions, index + 1);
    return current(next);
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => response;
};
