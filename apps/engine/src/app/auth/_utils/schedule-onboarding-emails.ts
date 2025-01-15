import { config } from '@/config';
import { api } from '@ds-project/api/service';

export async function scheduleOnboardingEmails(accountId: string) {
  await api.jobs.create([
    {
      type: 'email',
      accountId,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      data: {
        type: 'email',
        subject: 'DS Pro - Ready to sync?',
        template: {
          key: 'onboarding-1d',
          props: {
            staticPathUrl: `${config.pageUrl}/static/email`,
          },
        },
      },
    },
    {
      type: 'email',
      accountId,
      dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // 72 hours
      data: {
        type: 'email',
        subject: 'DS Pro - The Future of Design Tokens',
        template: {
          key: 'onboarding-3d',
          props: {
            staticPathUrl: `${config.pageUrl}/static/email`,
          },
        },
      },
    },
  ]);
}
