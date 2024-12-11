import '@ds-project/components/globals.css';

import { useEffect } from 'react';
import { api } from '@ds-project/api/react';
import { useConfig } from './providers/config-provider';
import { handle } from '@ds-project/figma-utilities';

export function VariablesUI() {
  const { fileName } = useConfig();
  const { mutateAsync: updateDesignTokens } =
    api.resources.updateDesignTokens.useMutation();

  useEffect(() => {
    return handle('sync-variables', async ({ variables }) => {
      // Update the design tokens when the variables are synced
      if (!fileName) {
        return {
          lastSyncedAt: null,
        };
      }

      await updateDesignTokens({
        designTokens: variables,
        name: fileName,
      });

      return {
        lastSyncedAt: new Date().toISOString(),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: perhaps refactor handle so no more than one listener to the same message type is added
  }, []);

  return null;
}
