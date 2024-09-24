'use client';

import { IntegrationCard } from '@/components';
import { Icons, Text, useToast } from '@ds-project/components';
import { useCallback, useState } from 'react';
import { SettingsForm } from './settings-form';
import { disableIntegration } from '../_actions/disable-integration.action';
import { useRouter } from 'next/navigation';
import { IntegrationLogo } from '@/components/integration-logo/integration-logo';
import { IntegrationSettings } from '@/components/integration-settings/integration-settings';

interface GithubCardProps {
  isEnabled: boolean;
  enableUrl: string;
  installationId?: number;
  selectedRepositoryId?: number;
  repositories?: { id: number; name: string }[];
}
export function GithubCard({
  isEnabled,
  installationId,
  repositories,
  selectedRepositoryId,
  enableUrl,
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
        {installationId ? (
          <SettingsForm
            installationId={installationId}
            repositories={repositories}
            selectedRepositoryId={selectedRepositoryId}
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