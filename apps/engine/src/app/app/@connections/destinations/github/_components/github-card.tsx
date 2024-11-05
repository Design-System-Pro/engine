'use client';

import { IntegrationCard } from '@/components';
import { Icons, Text } from '@ds-project/components/server';
import { useCallback, useState } from 'react';
import { SettingsForm } from './settings-form';
import { disableIntegration } from '../_actions/disable-integration.action';
import { useRouter } from 'next/navigation';
import { IntegrationLogo } from '@/components/integration-logo/integration-logo';
import { IntegrationSettings } from '@/components/integration-settings/integration-settings';
import type { api } from '@ds-project/api/rsc';
import { useToast } from '@ds-project/components/client';

interface GithubCardProps {
  isEnabled: boolean;
  enableUrl: string;
  repositories?: { id: number; name: string }[];
  integration: Awaited<ReturnType<typeof api.integrations.github>>;
}
export function GithubCard({
  isEnabled,
  repositories,
  enableUrl,
  integration,
}: GithubCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const onEnabledChange = useCallback(
    async (_isEnabled: boolean) => {
      if (!isEnabled && _isEnabled) {
        router.push(enableUrl);
        return;
      }

      const result = await disableIntegration();

      if (result?.serverError) {
        toast({
          title: 'Error',
          description: result.serverError,
          variant: 'destructive',
        });
      }

      if (result?.data?.success) {
        toast({
          title: 'Removed',
          description: 'GitHub integration has been removed.',
          variant: 'default',
        });
      }
    },
    [enableUrl, isEnabled, router, toast]
  );

  const closeHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <IntegrationCard
      logo={<IntegrationLogo icon={Icons.GitHubLogoIcon} />}
      description="Synchronize design tokens to your codebase in GitHub."
      name="GitHub"
    >
      <IntegrationSettings
        integrationLogo={<IntegrationLogo icon={Icons.GitHubLogoIcon} />}
        isEnabled={isEnabled}
        name="GitHub"
        onEnabledChange={onEnabledChange}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        {integration?.data.installationId ? (
          <SettingsForm
            integration={integration}
            repositories={repositories}
            onSuccess={closeHandler}
            onCancel={closeHandler}
          />
        ) : (
          <Text>
            <p>Enable the integration to configure it.</p>
          </Text>
        )}
      </IntegrationSettings>
    </IntegrationCard>
  );
}
