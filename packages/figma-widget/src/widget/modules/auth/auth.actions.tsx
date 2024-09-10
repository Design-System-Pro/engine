import { request } from '@ds-project/figma-utilities';
import { useUI } from '../../hooks/ui';
import { useSyncedCredentials } from '../state';

export function useAuthActions({
  onDisconnect,
}: { onDisconnect?: () => void } = {}) {
  const [syncedCredentials, setSyncedCredentials] = useSyncedCredentials();
  const { open, close } = useUI();
  const isConnected = Boolean(syncedCredentials);

  const disconnect = () => {
    setSyncedCredentials(null);
    onDisconnect?.();
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
