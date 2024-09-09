import { useSyncedCredentials, useSyncedLinkedProject } from '../modules/state';
import { Message, MessageType } from '@ds-project/figma-utilities';

export function useUI() {
  const [syncedLinkedProject] = useSyncedLinkedProject();
  const [syncedCredentials] = useSyncedCredentials();

  const open = async () => {
    const hasOpenedPromise = new Promise((resolve) => {
      Message.widget.handle(MessageType.UIIsReady, () => {
        console.log('✨ UI is open - ✅');
        resolve(void 0);
        return Promise.resolve({});
      });
    });

    void new Promise(() => {
      console.log('✨ Show UI - 🙋');

      figma.showUI(
        __html__.replace(
          '%__SHOW_UI_DATA__%',
          JSON.stringify({
            projectId: syncedLinkedProject?.id ?? null,
            fileName: figma.root.name,
            credentials: syncedCredentials,
          })
        ),
        {
          title: 'DS Project',
          visible: true,
        }
      );
    });

    return hasOpenedPromise;
  };

  const close = (message?: string) => {
    figma.closePlugin(message);
    console.log('✨ UI is closed - ❌');
  };

  return {
    open,
    close,
  };
}
