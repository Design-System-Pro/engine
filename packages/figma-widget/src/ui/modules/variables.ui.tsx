import '@ds-project/components/globals.css';

import { useEffect } from 'react';
import { api } from '@ds-project/api/react';
import { useConfig } from './providers/config-provider';
import { handle } from '@ds-project/figma-utilities';
import { useProjects } from './providers/projects-provider';

export function VariablesUI() {
  const { fileName } = useConfig();
  const { mutateAsync: updateDesignTokens } =
    api.resources.updateDesignTokens.useMutation();
  const { selectedProjectId } = useProjects();

  useEffect(() => {
    return handle('sync-variables', async ({ variables }) => {
      // Update the design tokens when the variables are synced
      if (!fileName || !selectedProjectId) {
        return {
          lastSyncedAt: null,
        };
      }

      await updateDesignTokens({
        designTokens: variables,
        name: fileName,
        projectId: selectedProjectId,
      });

      return {
        lastSyncedAt: new Date().toISOString(),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: perhaps refactor handle so no more than one listener to the same message type is added
  }, []);

  return null;
}
