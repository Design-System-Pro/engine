import { request } from '@ds-project/figma-utilities';
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
    const { credentials } = await request('connect', undefined);
    setSyncedCredentials(credentials);
    close();
  };

  return {
    isConnected,
    disconnect,
    connect,
  };
}
