import { MessageType, Message } from '@ds-project/figma-messaging';
import { useEffect } from '../lib/widget';
import type { LinkProps } from '../components/link';
import { Link } from '../components/link';
import { useSyncedCredentials } from './state';
import { useUI } from '../hooks/ui';

type ConnectButtonProps = LinkProps;

export function ConnectButton(props: ConnectButtonProps) {
  const [syncedCredentials, setSyncedCredentials] = useSyncedCredentials();
  const { open, close } = useUI();

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

  const handleDisconnect = () => {
    setSyncedCredentials(null);
  };

  const handleConnect = async () => {
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

  if (!syncedCredentials) {
    return (
      <Link onClick={handleConnect} {...props}>
        Connect
      </Link>
    );
  }

  return (
    <Link onClick={handleDisconnect} {...props}>
      Disconnect
    </Link>
  );
}
