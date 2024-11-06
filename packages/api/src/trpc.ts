/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';
import { ZodError } from 'zod';
import { createServerClient } from '@ds-project/auth/server';

// import type { Session } from '@acme/auth';
// import { auth, validateToken } from '@acme/auth';
import { database } from '@ds-project/database/client';
import { eq, sql } from '@ds-project/database';
import type { Account } from '@ds-project/database/schema';
import type { Database } from '@ds-project/database';
import { KeyHippo } from 'keyhippo';
import type { AuthenticatedContext, BaseContext } from './types/context';

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: {
  headers: Headers;
  account: Account | null;
}): Promise<BaseContext> => {
  const supabase = await createServerClient<Database>();
  const keyHippo = new KeyHippo(supabase);
  const { userId } = await keyHippo.authenticate(opts.headers);

  const source = opts.headers.get('x-trpc-source') ?? 'unknown';
  console.log(`>>> tRPC Request from ${source} by ${userId}`);

  return {
    supabase,
    database,
    userId,
    authRole: opts.headers.has('Authorization') ? 'api' : 'browser',
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an articifial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    return ctx.database.transaction(async (tx) => {
      if (ctx.userId) {
        await tx.execute(
          sql.raw(
            `SELECT set_config('request.jwt.claim.sub', ${ctx.userId}, TRUE)`
          )
        );

        await tx.execute(sql.raw(`SET ROLE 'authenticated'`));
      } else {
        await tx.execute(sql.raw(`SET ROLE 'anon'`));
      }

      const result = await next({
        ctx: {
          ...ctx,
          database: tx,
        },
      });

      if (ctx.userId) {
        await tx.execute(
          sql`SELECT set_config('request.jwt.claim.sub', NULL, TRUE)`
        );
      }

      await tx.execute(sql`RESET ROLE`);

      return result;
    });
  });

/**
 * Authenticated procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const authenticatedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    return ctx.database.transaction(async (tx) => {
      const { userId } = ctx;
      if (!userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await tx.execute(
        sql.raw(`SELECT set_config('request.jwt.claim.sub', '${userId}', TRUE)`)
      );

      await tx.execute(
        sql.raw(
          `SELECT set_config('request.jwt.claim.role', '${ctx.authRole}-user', TRUE)`
        )
      );

      await tx.execute(sql.raw(`SET ROLE 'authenticated'`));

      const account = userId
        ? ((await tx.query.Accounts.findFirst({
            where: (accounts) => eq(accounts.userId, userId),
          })) ?? null)
        : null;

      if (!account) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: "User doesn't have a valid account.",
        });
      }

      const result = await next({
        ctx: {
          ...ctx,
          database: tx,
          account,
        } satisfies AuthenticatedContext,
      });

      await tx.execute(
        sql.raw(`SELECT set_config('request.jwt.claim.sub', NULL, TRUE)`)
      );

      await tx.execute(
        sql.raw(`SELECT set_config('request.jwt.claim.role', NULL, TRUE)`)
      );

      await tx.execute(sql`RESET ROLE`);

      return result;
    });
  });
