import { Message, MessageType } from '@ds-project/figma-messaging';
import { Variables } from '../components/variables';
import { extractDesignTokens } from './design-tokens/extract-design-tokens';
import { useSyncedCredentials, useSyncedLastSyncedAt } from './state';
import { useEffect } from '../lib/widget';
import { useUI } from '../hooks/ui';

export function VariablesWidget() {
  const { open, close } = useUI();
  const [syncedCredentials] = useSyncedCredentials();
  const [lastSyncedAt, setLastSyncedAt] = useSyncedLastSyncedAt();

  useEffect(() => {
    Message.widget.handle(MessageType.SetLastSyncedAt, ({ lastSyncedAt }) => {
      setLastSyncedAt(lastSyncedAt);
      close();
      return Promise.resolve({});
    });
  });

  const onSyncVariablesClick = async () => {
    const designTokens = await extractDesignTokens();

    console.log('designTokens', designTokens);

    await open();
    const { lastSyncedAt } = await Message.widget.request({
      type: MessageType.SyncVariables,
      variables: designTokens,
    });
    console.log('lastSyncedAt', lastSyncedAt);
    setLastSyncedAt(lastSyncedAt);
  };

  if (!syncedCredentials) {
    return null;
  }

  return (
    <Variables
      onSyncVariablesClick={onSyncVariablesClick}
      lastSyncedAt={lastSyncedAt}
    />
  );
}
