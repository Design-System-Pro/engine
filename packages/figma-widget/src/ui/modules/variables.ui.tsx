import '@ds-project/components/globals.css';

import { useEffect } from 'react';
import { api } from '@ds-project/api/react';
import { useConfig } from './providers/config-provider';
import { Message, MessageType } from '@ds-project/figma-messaging';
import { useProjects } from './providers/projects-provider';

export function VariablesUI() {
  const { fileName } = useConfig();
  const { mutateAsync: updateDesignTokens } =
    api.resources.updateDesignTokens.useMutation();
  const { selectedProjectId } = useProjects();

  useEffect(() => {
    // Update the design tokens when the variables are synced
    Message.ui.handle(MessageType.SyncVariables, async ({ variables }) => {
      if (!fileName || !selectedProjectId) {
        return Promise.resolve({
          lastSyncedAt: null,
        });
      }

      await updateDesignTokens({
        designTokens: variables,
        name: fileName,
        projectId: selectedProjectId,
      });

      return Promise.resolve({
        lastSyncedAt: new Date().getTime(),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: perhaps refactor handle so no more than one listener to the same message type is added
  }, []);

  return null;
}
