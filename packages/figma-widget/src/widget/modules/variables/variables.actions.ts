import { requestAsync } from '@ds-project/figma-utilities';
import { useUI } from '../../hooks/ui';
import { useSyncedLastSyncedAt } from '../state';
import { useAuthActions } from '../auth/auth.actions';
import { useProjectActions } from '../project/project.actions';
import { extractDesignTokens } from '../design-tokens/extract-design-tokens';
import { injectVariables as injectVars } from '../design-tokens/injectors/variables';

export function useVariablesActions() {
  const { open } = useUI();
  const [lastSyncedAt, setLastSyncedAt] = useSyncedLastSyncedAt();
  const { isConnected } = useAuthActions();
  const { selectedProject } = useProjectActions();
  const isReady = Boolean(isConnected && selectedProject);

  const syncVariables = async () => {
    const designTokens = await extractDesignTokens();

    await open();

    const { lastSyncedAt } = await requestAsync('sync-variables', {
      variables: designTokens,
    });
    setLastSyncedAt(lastSyncedAt);
  };

  const injectVariables = async () => {
    await open();

    const { normalizedTokens } = await requestAsync(
      'get-normalized-tokens',
      undefined
    );

    if (normalizedTokens) {
      console.log({ normalizedTokens });
      await injectVars(normalizedTokens);
    }
  };

  return {
    isReady,
    lastSyncedAt,
    syncVariables,
    injectVariables,
  };
}
