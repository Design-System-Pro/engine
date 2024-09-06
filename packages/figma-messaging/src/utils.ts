import { Message } from './message';
import { MessageType } from './message.types';
import type { ConfigData } from './config-data';

// TODO: move to widget hook instead
export const openUI = async (config: ConfigData) => {
  const fileName = figma.root.name;

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
      __html__.replace('%__SHOW_UI_DATA__%', JSON.stringify(config)),
      {
        title: 'DS Project',
        visible: true,
      }
    );
  });

  return hasOpenedPromise;
};

export const closeUI = (message?: string) => {
  figma.closePlugin(message);
  console.log('✨ UI is closed - ❌');
};
