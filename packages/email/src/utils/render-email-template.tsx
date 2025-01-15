import type { EmailTemplateType } from '@ds-project/database/schema';

import { render } from '@react-email/render';

import { Onboarding1DayEmail } from '../templates/onboarding-1-day';
import VerifyOTPEmail from '../templates/verify-otp';
import WelcomeEmail from '../templates/welcome';
import Onboarding3DaysEmail from '../templates/onboarding-3-days';

export async function renderEmailTemplate(templateProps: EmailTemplateType) {
  const template = (() => {
    switch (templateProps.key) {
      case 'verify-otp':
        return <VerifyOTPEmail {...templateProps.props} />;
      case 'welcome':
        return <WelcomeEmail {...templateProps.props} />;
      case 'onboarding-1d':
        return <Onboarding1DayEmail {...templateProps.props} />;
      case 'onboarding-3d':
        return <Onboarding3DaysEmail {...templateProps.props} />;
      default:
        throw new Error(`Unknown template key.`);
    }
  })();

  return await render(template);
}
