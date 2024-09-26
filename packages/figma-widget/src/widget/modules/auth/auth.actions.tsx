import { requestAsync } from '@ds-project/figma-utilities';
import { useUI } from '../../hooks/ui';
import { useCleanupSyncedState, useSyncedCredentials } from '../state';

export function useAuthActions() {
  const cleanupSyncedState = useCleanupSyncedState();
  const [syncedCredentials, setSyncedCredentials] = useSyncedCredentials();
  const { open, close } = useUI();
  const isConnected = Boolean(syncedCredentials);

  const disconnect = () => {
    cleanupSyncedState();
  };

  const connect = async () => {
    await open();

    try {
      const { credentials } = await requestAsync('connect', undefined, {
        timeout: 5 * 60 * 1000, // 5 minutes
      });

      setSyncedCredentials(credentials);
    } finally {
      close();
    }
  };

  return {
    isConnected,
    disconnect,
    connect,
  };
}
