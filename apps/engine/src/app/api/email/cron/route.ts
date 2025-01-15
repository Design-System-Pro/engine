import { serverEnv } from '@/env/server-env';
import { api } from '@ds-project/api/service';
import { sendEmail } from '@ds-project/email';
import type { NextRequest } from 'next/server';

/**
 * Checks the scheduled emails in the database and sends the emails that are due
 */

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  // Verify the request is coming from an authorized source
  if (authHeader !== `Bearer ${serverEnv.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
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

  return Response.json({ success: true });
}
