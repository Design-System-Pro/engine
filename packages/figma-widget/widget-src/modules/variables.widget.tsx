import { closeUI, Message, MessageType } from '@ds-project/figma-messaging';
import { Variables } from '../components/variables';
import { extractDesignTokens } from './design-tokens/extract-design-tokens';
import { useSyncedCredentials, useSyncedLastSyncedAt } from './state';
import { useEffect } from '../lib/widget';

export function VariablesWidget() {
  const [syncedCredentials] = useSyncedCredentials();
  const [lastSyncedAt, setLastSyncedAt] = useSyncedLastSyncedAt();

  useEffect(() => {
    Message.widget.handle(MessageType.SetLastSyncedAt, ({ lastSyncedAt }) => {
      setLastSyncedAt(lastSyncedAt);
      closeUI();
      return Promise.resolve({});
    });
  });

  const onSyncVariablesClick = async () => {
    const designTokens = await extractDesignTokens();

    console.log('designTokens', designTokens);

    await Message.widget.request({
      type: MessageType.SyncVariables,
      variables: designTokens,
    });
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
