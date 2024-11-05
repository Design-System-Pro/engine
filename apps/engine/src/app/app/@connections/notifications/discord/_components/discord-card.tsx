'use client';

import { IntegrationCard } from '@/components';
import { Button, Icons } from '@ds-project/components/server';
import { IntegrationLogo } from '@/components/integration-logo/integration-logo';

export function DiscordCard() {
  return (
    <IntegrationCard
      disabled={true}
      logo={<IntegrationLogo icon={Icons.DiscordLogoIcon} />}
      description="Send notifications about changes, releases or issues with your configuration."
      name="Discord"
    >
      <Button disabled={true}>Coming soon</Button>
    </IntegrationCard>
  );
}
