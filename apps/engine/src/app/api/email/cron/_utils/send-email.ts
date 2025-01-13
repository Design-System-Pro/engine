import { api } from '@ds-project/api/service';
import type {
  EmailTemplateKey,
  EmailTemplateProps,
} from './render-email-template';
import { renderEmailTemplate } from './render-email-template';
import { resend } from '@ds-project/email/src/resend';

export async function sendEmail({
  accountId,
  subject,
  templateKey: key,
  templateProps: props,
}: {
  accountId: string;
  subject: string;
  templateKey: EmailTemplateKey;
  templateProps: EmailTemplateProps;
}) {
  const account = await api.accounts.get({ id: accountId });

  if (!account) {
    // TODO: Handle error
    return;
  }

  const { error } = await resend.emails.send({
    from: 'DS Pro <noreply@getds.pro>',
    to: [account.email],
    subject,
    html: await renderEmailTemplate({
      key,
      props,
    }),
    scheduledAt: 'in 24 hours',
  });

  if (error) {
    throw new Error(error.message, { cause: error.name });
  }
}
