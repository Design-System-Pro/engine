import { jsonb, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { Accounts } from './accounts';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const jobTypeEnum = pgEnum('job_type', ['email']);

export const jobType = z.enum(jobTypeEnum.enumValues);
export const emailDataSchema = z.object({
  type: z.literal(jobType.Enum.email),
  templateKey: z.enum(['onboarding-24h', 'onboarding-48h']),
  templateProps: z.record(z.unknown()),
  subject: z.string().min(1),
});

type JobData = z.infer<typeof emailDataSchema>;

export const jobStateEnum = pgEnum('job_state', [
  'pending',
  'completed',
  'failed',
  'canceled',
]);

export const Jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  state: jobStateEnum('state').notNull(),
  type: jobTypeEnum('type').notNull(),
  accountId: uuid('account_id')
    .references(() => Accounts.id, { onDelete: 'cascade' })
    .notNull(),
  dueDate: timestamp('due_date', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  data: jsonb('data').$type<JobData>(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});

export type InsertJobs = typeof Jobs.$inferInsert;
export type SelectJobs = typeof Jobs.$inferSelect;

export const InsertJobsSchema = createInsertSchema(Jobs, {
  data: () => emailDataSchema,
});
export const SelectJobsSchema = createSelectSchema(Jobs);
