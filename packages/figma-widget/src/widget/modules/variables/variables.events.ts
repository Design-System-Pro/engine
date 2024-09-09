import { Message, MessageType } from '@ds-project/figma-messaging';
import { useEffect } from '../../lib/widget';
import { useUI } from '../../hooks/ui';
import { useSyncedCredentials, useSyncedLastSyncedAt } from '../state';

export function VariablesEvents() {
  const { close } = useUI();
  const [_, setLastSyncedAt] = useSyncedLastSyncedAt();

  useEffect(() => {
    Message.widget.handle(MessageType.SetLastSyncedAt, ({ lastSyncedAt }) => {
      setLastSyncedAt(lastSyncedAt);
      close();
      return Promise.resolve({});
    });
  });
}
