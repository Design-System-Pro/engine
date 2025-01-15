import { api } from '@ds-project/api/service';
import type { EmailTemplateType } from '@ds-project/database/schema';
import { renderEmailTemplate } from './render-email-template';
import { resend } from '../resend';
import type { CreateEmailOptions } from 'resend';

export async function sendEmail({
  accountId,
  email,
  subject,
  template,
  scheduledAt,
}: {
  accountId?: string;
  email?: string;
  subject: string;
  template: EmailTemplateType;
  scheduledAt?: CreateEmailOptions['scheduledAt'];
}) {
  let emailTo = email;

  if (!emailTo && accountId) {
    const account = await api.accounts.get({ id: accountId });

    emailTo = account?.email;
  }

  if (!emailTo) {
    throw new Error('No email provided.');
  }

  const { error } = await resend.emails.send({
    from: 'DS Pro <noreply@getds.pro>',
    replyTo: 'Tomas @ DS Pro <tomas@getds.pro>',
    to: [emailTo],
    subject,
    html: await renderEmailTemplate(template),
    scheduledAt,
  });

  if (error) {
    throw new Error(error.message, { cause: error.name });
  }
}
