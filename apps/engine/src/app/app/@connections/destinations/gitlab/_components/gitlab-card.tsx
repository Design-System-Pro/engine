'use client';

import { IntegrationCard } from '@/components';
import { Button, LucideIcons } from '@ds-project/components/server';
import { IntegrationLogo } from '@/components/integration-logo/integration-logo';

export function GitlabCard() {
  return (
    <IntegrationCard
      disabled={true}
      logo={<IntegrationLogo icon={LucideIcons.GitlabIcon} />}
      description="Synchronize design tokens to your codebase in GitLab."
      name="GitLab"
    >
      <Button disabled={true}>Coming soon</Button>
    </IntegrationCard>
  );
}
