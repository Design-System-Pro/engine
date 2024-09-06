import '@ds-project/components/globals.css';

import { useAuth } from './providers/auth-provider';
import { useEffect, useState } from 'react';
import { api } from '@ds-project/api/react';
import { useConfig } from './providers/config-provider';
import { Message, MessageType } from '@ds-project/figma-messaging';
import { useProjects } from './providers/projects-provider';
import type { DesignTokens } from 'style-dictionary/types';

export function VariablesUI() {
  const { state } = useAuth();
  const { fileName } = useConfig();
  const { mutateAsync: updateDesignTokens } =
    api.resources.updateDesignTokens.useMutation();
  const { selectedProjectId } = useProjects();
  const [variables, setVariables] = useState<DesignTokens>();

  useEffect(() => {
    // Update the design tokens when the variables are synced
    Message.ui.handle(MessageType.SyncVariables, ({ variables }) => {
      setVariables(variables);

      return Promise.resolve({});
    });
  }, [fileName, selectedProjectId, state, updateDesignTokens]);

  useEffect(() => {
    if (!variables || !fileName || !selectedProjectId) {
      console.log('💥 not syncing variables', {
        variables,
        fileName,
        selectedProjectId,
      });
      return;
    }
    console.log('💥 syncing variables', {
      variables,
      fileName,
      selectedProjectId,
    });

    updateDesignTokens({
      designTokens: variables,
      name: fileName,
      projectId: selectedProjectId,
    })
      .then(() => {
        void Message.ui.send({
          type: MessageType.SetLastSyncedAt,
          lastSyncedAt: new Date().getTime(),
        });
      })
      .catch((error) => {
        console.error('💥 error syncing variables', error);
      });
  }, [variables, fileName, selectedProjectId, updateDesignTokens]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('👀 design tokens updated');
  //     void Message.ui.send({
  //       type: MessageType.SetLastSyncedAt,
  //       lastSyncedAt: new Date().getTime(),
  //     });
  //   }
  // }, [isSuccess]);

  return null;
}
