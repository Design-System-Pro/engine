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
import {
  createServerClient,
  createServiceClient,
} from '@ds-project/auth/server';

// import type { Session } from '@acme/auth';
// import { auth, validateToken } from '@acme/auth';
import { database } from '@ds-project/database/client';
import { eq, sql } from '@ds-project/database';
import type { Account } from '@ds-project/database/schema';
import type { Database } from '@ds-project/database';
import { KeyHippo } from 'keyhippo';

type TRPCContext = {
  supabase: ReturnType<typeof createServerClient<Database>>;
  database: typeof database;
} & (
  | {
      userId: string;
      authRole: 'api' | 'browser';
    }
  | {
      authRole: 'service';
    }
);

/**
 * 1. CLIENT CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 * It takes in consideration headers, cookies, etc. and returns a context object
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createClientTRPCContext = async (opts: {
  headers: Headers;
  account: Account | null;
}): Promise<TRPCContext> => {
  const supabase = createServerClient<Database>();
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
 * 1. SERVICE CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 * It does not take in consideration headers, cookies, etc. and returns a context object
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createServiceTRPCContext = (): TRPCContext => {
  const supabase = createServiceClient<Database>();
  const source = 'service';
  console.log(`>>> tRPC Request from ${source}`);

  return {
    supabase,
    database,
    authRole: 'service',
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC
  .context<typeof createClientTRPCContext | typeof createServiceTRPCContext>()
  .create({
    transformer: SuperJSON,
    errorFormatter: ({ shape, error }) => ({
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
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
    if (ctx.authRole !== 'api' && ctx.authRole !== 'browser') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Procedure context is not initialized.',
      });
    }

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
      if (ctx.authRole !== 'api' && ctx.authRole !== 'browser') {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Procedure context is not initialized.',
        });
      }

      if (!ctx.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await tx.execute(
        sql.raw(
          `SELECT set_config('request.jwt.claim.sub', '${ctx.userId}', TRUE)`
        )
      );

      await tx.execute(
        sql.raw(
          `SELECT set_config('request.jwt.claim.role', '${ctx.authRole}-user', TRUE)`
        )
      );

      await tx.execute(sql.raw(`SET ROLE 'authenticated'`));

      const { userId } = ctx;

      const account = userId
        ? ((await tx.query.Accounts.findFirst({
            where: (accounts) => eq(accounts.userId, userId),
            with: {
              accountsToProjects: {
                columns: {
                  projectId: true,
                },
              },
            },
          })) ?? null)
        : null;

      if (!account?.accountsToProjects[0]?.projectId) {
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
          projectId: account.accountsToProjects[0].projectId,
        },
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

/**
 * Service procedure
 *
 * If you want a query or mutation to ONLY be accessible to service actors, use this.
 * It verifies if the service token is valid
 *
 * @see https://trpc.io/docs/procedures
 */
export const serviceProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (ctx.authRole !== 'service') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Procedure context is not initialized.',
      });
    }

    return ctx.database.transaction(async (tx) => {
      // validate service token? Maybe supabase does this for us 🤷🏻‍♂️

      await tx.execute(
        sql.raw(
          `SELECT set_config('request.jwt.claim.role', '${ctx.authRole}', TRUE)`
        )
      );

      await tx.execute(sql.raw(`SET ROLE 'service_role'`));

      const result = await next({
        ctx: {
          ...ctx,
          database: tx,
        },
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
