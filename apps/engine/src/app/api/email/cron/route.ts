import { serverEnv } from '@/env/server-env';
import { api } from '@ds-project/api/service';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';
import { sendEmail } from './_utils/send-email';

/**
 * Checks the scheduled emails in the database and sends the emails that are due
 */

export async function POST(request: NextRequest) {
  const wh = new Webhook(serverEnv.SERVICE_HOOK_SECRET);
  const payload = await request.text();
  const headers = Object.fromEntries(request.headers);

  // Get due jobs of type email
  // Iterate over the due jobs
  // Per each job, send the email
  // Mark the job as done

  // Verify the request is coming from an authorized source
  try {
    wh.verify(payload, headers);
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 401,
      }
    );
  }

  const dueEmailJobs = await api.jobs.getDueEmailList();

  console.log('dueEmailJobs', dueEmailJobs);

  // Run all the possible jobs, don't break if one fails. This way we can process all the jobs
  await Promise.allSettled(
    dueEmailJobs.map(async (job) => {
      if (job.data?.type !== 'email') {
        // TODO: Handle error
        return;
      }

      const account = await api.accounts.get({ id: job.accountId });

      if (!account) {
        // TODO: Handle error
        return;
      }

      await sendEmail({
        accountId: job.accountId,
        subject: job.data.subject,
        templateKey: job.data.templateKey,
        templateProps: job.data.templateProps,
      });
    })
  );

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
