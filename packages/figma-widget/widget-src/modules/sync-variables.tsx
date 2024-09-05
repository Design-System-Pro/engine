import { Message, MessageType } from '@ds-project/figma-messaging';
import { Variables } from '../components/variables';
import { extractDesignTokens } from './design-tokens/extract-design-tokens';

export function SyncVariables() {
  const onSyncVariablesClick = async () => {
    const designTokens = await extractDesignTokens();

    Message.widget
      .request({
        type: MessageType.SyncVariables,
        variables: designTokens,
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        figma.closePlugin();
      });
  };

  return <Variables onSyncVariablesClick={onSyncVariablesClick} />;
}
