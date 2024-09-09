import { Message, MessageType } from '@ds-project/figma-utilities';
import { useEffect } from '../../lib/widget';
import { useUI } from '../../hooks/ui';
import { useSyncedLastSyncedAt } from '../state';

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
