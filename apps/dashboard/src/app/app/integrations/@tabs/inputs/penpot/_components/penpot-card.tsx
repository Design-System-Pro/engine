'use client';

import { IntegrationCard } from '@/components';
import { Button, PenpotLogo } from '@ds-project/components';
import { IntegrationLogo } from '@/components/integration-logo/integration-logo';

export function PenpotCard() {
  return (
    <IntegrationCard
      disabled={true}
      logo={<IntegrationLogo icon={PenpotLogo} />}
      description="Syncronize your assets directly from Penpot files."
      name="Penpot"
    >
      <Button disabled={true}>Coming soon</Button>
    </IntegrationCard>
  );
}
