'use client';

import { IntegrationCard } from '@/components';
import { Button, Icons, LucideIcons } from '@ds-project/components';
import { IntegrationLogo } from '@/components/integration-logo/integration-logo';

export function SlackCard() {
  return (
    <IntegrationCard
      disabled={true}
      logo={<IntegrationLogo icon={LucideIcons.SlackIcon} />}
      description="Send notifications about changes, releases or issues with your configuration."
      name="Slack"
    >
      <Button disabled={true}>Coming soon</Button>
    </IntegrationCard>
  );
}
