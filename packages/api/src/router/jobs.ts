import { and, eq, lte } from '@ds-project/database';
import { createTRPCRouter, serviceProcedure } from '../trpc';
import {
  Jobs,
  InsertJobsSchema,
  SelectJobsSchema,
} from '@ds-project/database/schema';
import { z } from 'zod';

export const jobsRouter = createTRPCRouter({
  create: serviceProcedure
    .input(
      z.union([
        InsertJobsSchema.pick({
          accountId: true,
          type: true,
          dueDate: true,
          data: true,
        }),
        z.array(
          InsertJobsSchema.pick({
            accountId: true,
            type: true,
            dueDate: true,
            data: true,
          })
        ),
      ])
    )
    .mutation(async ({ ctx, input }) => {
      if (Array.isArray(input)) {
        return ctx.database.transaction(async (tx) => {
          for (const job of input) {
            await tx
              .insert(Jobs)
              .values({
                ...job,
                state: 'pending',
              })
              .onConflictDoNothing();
          }
        });
      }

      await ctx.database
        .insert(Jobs)
        .values({
          ...input,
          state: 'pending',
        })
        .onConflictDoNothing();
    }),
  getDueEmailList: serviceProcedure.query(async ({ ctx, input }) => {
    return ctx.database.query.Jobs.findMany({
      where: (jobs) =>
        and(
          eq(jobs.type, 'email'),
          eq(jobs.state, 'pending'),
          lte(jobs.dueDate, new Date().toISOString())
        ),
      columns: {
        id: true,
        accountId: true,
        data: true,
      },
    });
  }),
  markCompleted: serviceProcedure
    .input(SelectJobsSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.database
        .update(Jobs)
        .set({
          state: 'completed',
        })
        .where(eq(Jobs.id, input.id));
    }),
});
