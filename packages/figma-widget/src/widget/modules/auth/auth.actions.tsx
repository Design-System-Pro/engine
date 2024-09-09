import { Message, MessageType } from '@ds-project/figma-utilities';
import { useUI } from '../../hooks/ui';
import { useSyncedCredentials } from '../state';

export function useAuthActions() {
  const [syncedCredentials, setSyncedCredentials] = useSyncedCredentials();
  const { open, close } = useUI();
  const isConnected = Boolean(syncedCredentials);

  const disconnect = () => {
    setSyncedCredentials(null);
  };

  const connect = async () => {
    await open();
    await new Promise(() => {
      Message.widget
        .request({
          type: MessageType.Connect,
        })
        .then(({ credentials }) => {
          setSyncedCredentials(credentials);
        })
        .catch((error) => {
          console.error('Error getting credentials', error);
        })
        .finally(() => {
          close();
        });
    });
  };

  return {
    isConnected,
    disconnect,
    connect,
  };
}
