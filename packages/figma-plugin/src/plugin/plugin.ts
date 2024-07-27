import type { Message } from '../types';
import { MessageType } from '../types';
import { config } from '../ui/config';
import { storage } from './storage';

figma.showUI(__html__, {
  themeColors: true,
  height: 306,
  width: 275,
  title: 'DS Project',
});

figma.ui.on('message', (message: Message) => {
  (async () => {
    switch (message.type) {
      case MessageType.UIReady: {
        // const tokens = await GetVars();
        // figma.ui.postMessage({
        //   type: 'export-design-token-json',
        //   tokens,
        // });

        const githubToken = await storage.get(config.TOKEN_KEY);
        if (githubToken) {
          figma.ui.postMessage({
            type: MessageType.LoadAccessToken,
            token: githubToken,
          });
        }
        break;
      }

      case MessageType.SetAccessToken: {
        await storage.set(config.TOKEN_KEY, message.type);
        break;
      }

      case MessageType.DeleteAccessToken: {
        await figma.clientStorage.deleteAsync(config.TOKEN_KEY);
        break;
      }

      case MessageType.LoadAccessToken:
      default: {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.log(`🧩 Plugin Message type ${message.type} was ignored.`);
      }
    }
    return message.type;
  })()
    .then((messageType: MessageType) => {
      // eslint-disable-next-line no-console -- TODO: replace with monitoring
      console.log(`🧩 Plugin Message type ${messageType} processed.`);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console -- TODO: replace with monitoring
      console.log('🧩 Plugin Error.', error);
    });
});
