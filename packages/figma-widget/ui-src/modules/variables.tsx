import '@ds-project/components/globals.css';

import { useAuth } from './providers/auth-provider';
import { useEffect } from 'react';
import { api } from '@ds-project/api/react';
import { useConfig } from './providers/config-provider';
import { Message, MessageType } from '@ds-project/figma-messaging';
import { useProjects } from './providers/projects-provider';

export function Variables() {
  const { state } = useAuth();
  const { fileName } = useConfig();
  const { mutate: updateDesignTokens } =
    api.resources.updateDesignTokens.useMutation();
  const { selectedProjectId } = useProjects();

  useEffect(() => {
    if (!fileName || !selectedProjectId || state !== 'authorized') return;
    // Update the design tokens when the variables are synced

    Message.ui.handle(MessageType.SyncVariables, ({ variables }) => {
      console.log({ variables });
      const lastSyncedAt = new Date().getTime();

      updateDesignTokens({
        designTokens: variables,
        name: fileName,
        projectId: selectedProjectId,
      });

      return Promise.resolve({
        lastSyncedAt,
      });
    });
  }, [fileName, selectedProjectId, state, updateDesignTokens]);

  return null;
}
