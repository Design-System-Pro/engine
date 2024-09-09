import { Message, MessageType } from '@ds-project/figma-messaging';
import { useUI } from '../../hooks/ui';
import { useSyncedLastSyncedAt } from '../state';
import { extractDesignTokens } from '../design-tokens/extract-design-tokens';
import { useAuthActions } from '../auth/auth.actions';
import { useProjectActions } from '../project/project.actions';

export function useVariablesActions() {
  const { open } = useUI();
  const [lastSyncedAt, setLastSyncedAt] = useSyncedLastSyncedAt();
  const { isConnected } = useAuthActions();
  const { selectedProject } = useProjectActions();
  const isReady = isConnected && selectedProject;

  const syncVariables = async () => {
    const designTokens = await extractDesignTokens();

    await open();

    const { lastSyncedAt } = await Message.widget.request({
      type: MessageType.SyncVariables,
      variables: designTokens,
    });
    setLastSyncedAt(lastSyncedAt);
  };

  return {
    isReady,
    lastSyncedAt,
    syncVariables,
  };
}
