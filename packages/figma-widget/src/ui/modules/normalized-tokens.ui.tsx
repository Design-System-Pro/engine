import '@ds-project/components/globals.css';

import { useEffect } from 'react';
import { api } from '@ds-project/api/react';
import { useConfig } from './providers/config-provider';
import { handle } from '@ds-project/figma-utilities';
import { useProjects } from './providers/projects-provider';

export function NormalizedTokensUI() {
  const { fileName } = useConfig();
  const { selectedProjectId } = useProjects();
  const { refetch } = api.resources.getNormalizedTokens.useQuery(
    { projectId: selectedProjectId || '', name: fileName || '' },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    return handle('get-normalized-tokens', async () => {
      if (!selectedProjectId || !fileName) {
        return {
          normalizedTokens: null,
        };
      }

      const { data } = await refetch();

      return {
        normalizedTokens: data || null,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: perhaps refactor handle so no more than one listener to the same message type is added
  }, []);

  return null;
}
