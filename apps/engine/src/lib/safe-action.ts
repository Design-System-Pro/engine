import 'server-only';

import { createServerClient } from '@ds-project/auth/server';
import type { Database } from '@ds-project/database';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { z } from 'zod';
import { database } from '@ds-project/database/client';

class ActionError extends Error {}

// Base client.
const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  // Define logging middleware.
})
  .use(async ({ next, metadata }) => {
    const startTime = performance.now();

    // Here we await the action execution.
    const result = await next();

    const endTime = performance.now();

    // console.log('Result ->', result);
    // console.log('Client input ->', clientInput);
    // console.log('Metadata ->', metadata);
    console.log(
      `Action ${metadata.actionName} execution took`,
      endTime - startTime,
      'ms'
    );

    // And then return the result of the awaited action.
    return result;
  })
  .use(async ({ ctx, next }) => {
    // Provide the auth client to the action.
    const authClient = createServerClient<Database>();

    return next({ ctx: { ...ctx, authClient } });
  });

export const unprotectedAction = actionClient;

// Auth client defined by extending the base one.
// Note that the same initialization options and middleware functions of the base client
// will also be used for this one.
export const authorizedAction = actionClient
  // Define authorization middleware.
  .use(async ({ next, ctx }) => {
    const {
      data: { user },
    } = await ctx.authClient.auth.getUser();

    if (!user) {
      throw new Error('User is not logged in!');
    }

    return next({ ctx: { user, database } });
  });
