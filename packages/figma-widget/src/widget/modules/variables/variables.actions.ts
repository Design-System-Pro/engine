import { requestAsync } from '@ds-project/figma-utilities';
import { useUI } from '../../hooks/ui';
import { useSyncedLastSyncedAt } from '../state';
import { useAuthActions } from '../auth/auth.actions';
import { useProjectActions } from '../project/project.actions';
import { extractDesignTokens } from '../design-tokens/extract-design-tokens';

export function useVariablesActions() {
  const { open } = useUI();
  const [lastSyncedAt, setLastSyncedAt] = useSyncedLastSyncedAt();
  const { isConnected } = useAuthActions();
  const { selectedProject } = useProjectActions();
  const isReady = isConnected && selectedProject;

  const syncVariables = async () => {
    const designTokens = await extractDesignTokens();

    await open();

    const { lastSyncedAt } = await requestAsync('sync-variables', {
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
