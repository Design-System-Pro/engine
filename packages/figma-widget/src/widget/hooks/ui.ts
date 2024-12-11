import { useSyncedCredentials } from '../modules/state';
import { once } from '@ds-project/figma-utilities';

export function useUI() {
  const [syncedCredentials] = useSyncedCredentials();

  const open = async (options: ShowUIOptions = {}) => {
    const hasOpenedPromise = new Promise((resolve) => {
      once('ui-is-ready', () => {
        console.log('✨ UI is open - ✅');
        resolve(void 0);
      });
    });

    void new Promise(() => {
      console.log('✨ Show UI - 🙋');

      figma.showUI(
        __html__.replace(
          '%__SHOW_UI_DATA__%',
          JSON.stringify({
            fileName: figma.root.name,
            credentials: syncedCredentials,
          })
        ),
        {
          title: 'DS Project',
          visible: false,
          themeColors: false,
          ...options,
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
