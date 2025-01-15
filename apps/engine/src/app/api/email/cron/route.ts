import { serverEnv } from '@/env/server-env';
import { api } from '@ds-project/api/service';
import { sendEmail } from '@ds-project/email';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';

/**
 * Checks the scheduled emails in the database and sends the emails that are due
 */

export async function POST(request: NextRequest) {
  const wh = new Webhook(serverEnv.CRON_SECRET);
  const payload = await request.text();
  const headers = Object.fromEntries(request.headers);

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

  console.log(`👀 ${dueEmailJobs.length} due email jobs found.`);
  // Run all the possible jobs, don't break if one fails. This way we can process all the jobs
  await Promise.allSettled(
    dueEmailJobs.map(async (job, jobIndex) => {
      console.log(
        `⚙️ (${jobIndex + 1}/${dueEmailJobs.length}) Processing job ${job.id}.`
      );
      // Only process jobs of type email
      if (job.data?.type !== 'email') {
        console.log(
          `⏭️ (${jobIndex + 1}/${dueEmailJobs.length}) Skipped job ${job.id}.`
        );
        return;
      }

      await sendEmail({
        accountId: job.accountId,
        subject: job.data.subject,
        template: job.data.template,
      });

      await api.jobs.markCompleted({ id: job.id });

      console.log(
        `📧 (${jobIndex + 1}/${dueEmailJobs.length}) Email job ${job.id} processed successfully.`
      );
    })
  );

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
