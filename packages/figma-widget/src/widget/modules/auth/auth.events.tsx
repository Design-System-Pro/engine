import { Message, MessageType } from '@ds-project/figma-messaging';
import { useEffect } from '../../lib/widget';
import { useSyncedCredentials } from '../state';

export function AuthEvents() {
  const [syncedCredentials, setSyncedCredentials] = useSyncedCredentials();

  useEffect(() => {
    Message.widget.handle(MessageType.GetCredentials, async () => {
      return Promise.resolve({ credentials: syncedCredentials });
    });

    Message.widget.handle(
      MessageType.SetCredentials,
      async ({ credentials }) => {
        setSyncedCredentials(credentials);
        return Promise.resolve({});
      }
    );

    Message.widget.handle(MessageType.DeleteCredentials, async () => {
      setSyncedCredentials(null);
      return Promise.resolve({});
    });
  });

  return null;
}