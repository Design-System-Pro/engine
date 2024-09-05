import { AsyncMessageTypes, Message } from '@ds-project/figma-messaging';
import type { Credentials } from '@ds-project/figma-messaging';
import { useSyncedState } from '../lib/widget';
import type { LinkProps } from '../components/link';
import { Link } from '../components/link';

type ConnectButtonProps = LinkProps;

export function ConnectButton(props: ConnectButtonProps) {
  const [credentials, setCredentials] = useSyncedState<Credentials | null>(
    'credentials',
    null
  );

  const handleDisconnect = () => {
    setCredentials(null);
  };

  const handleConnect = async () => {
    await new Promise(() => {
      figma.showUI(__html__, {
        themeColors: true,
        height: 306,
        width: 275,
        title: 'DS Project',
        visible: true,
      });

      Message.widget.handle(AsyncMessageTypes.CloseUI, () => {
        figma.closePlugin();
        return Promise.resolve({});
      });

      Message.widget.handle(AsyncMessageTypes.GetCredentials, async () => {
        return Promise.resolve({ credentials });
      });

      Message.widget.handle(
        AsyncMessageTypes.SetCredentials,
        async ({ credentials: _credentials }) => {
          setCredentials(_credentials);
          return Promise.resolve({});
        }
      );
    });
  };

  if (!credentials) {
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
