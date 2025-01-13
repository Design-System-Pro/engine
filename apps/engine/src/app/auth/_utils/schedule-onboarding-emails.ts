import { api } from '@ds-project/api/service';

export async function scheduleOnboardingEmails(accountId: string) {
  await api.jobs.create([
    {
      type: 'email',
      accountId,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      data: {
        type: 'email',
        subject: 'Welcome to DS Pro',
        templateKey: 'onboarding-24h',
        templateProps: {},
      },
    },
    {
      type: 'email',
      accountId,
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours
      data: {
        type: 'email',
        subject: 'Welcome to DS Pro',
        templateKey: 'onboarding-24h',
        templateProps: {},
      },
    },
  ]);
}
