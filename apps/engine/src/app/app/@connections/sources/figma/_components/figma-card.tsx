'use client';

import { IntegrationCard } from '@/components';
import { Button, Icons } from '@ds-project/components';
import { IntegrationLogo } from '@/components/integration-logo/integration-logo';
import Link from 'next/link';
import { config } from '@/config';

export function FigmaCard() {
  return (
    <IntegrationCard
      logo={<IntegrationLogo icon={Icons.FigmaLogoIcon} />}
      description="Install DS Pro widget in your Figma file to synchronize Figma Variables."
      name="Figma"
    >
      <Button asChild>
        <Link href={config.figmaWidgetUrl}>Install Widget</Link>
      </Button>
    </IntegrationCard>
  );
}
