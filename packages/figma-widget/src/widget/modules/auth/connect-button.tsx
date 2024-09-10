import type { LinkProps } from '../../components/link';
import { Link } from '../../components/link';
import { useAuthActions } from './auth.actions';

type ConnectButtonProps = LinkProps;

export function ConnectButton(props: ConnectButtonProps) {
  const { isConnected, connect, disconnect } = useAuthActions();

  return (
    <Link onClick={isConnected ? disconnect : connect} {...props}>
      {isConnected ? 'Disconnect' : 'Connect'}
    </Link>
  );
}
