import { render } from '@ds-project/email/src/render';
import { Onboarding24hEmail } from '@ds-project/email/src/templates/onboarding-24h';
import { Onboarding48hEmail } from '@ds-project/email/src/templates/onboarding-48h';

export type EmailTemplateKey = 'onboarding-24h' | 'onboarding-48h';
export type EmailTemplateProps = Record<string, unknown>;

export async function renderEmailTemplate({
  key,
  props,
}: {
  key: EmailTemplateKey;
  props: EmailTemplateProps;
}) {
  const template = (() => {
    switch (key) {
      case 'onboarding-24h':
        return <Onboarding24hEmail {...props} />;
      case 'onboarding-48h':
        return <Onboarding48hEmail {...props} />;
      default:
        throw new Error(`Unknown template key.`);
    }
  })();

  return await render(template);
}
