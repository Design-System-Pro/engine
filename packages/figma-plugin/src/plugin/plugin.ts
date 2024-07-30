import { AsyncMessage } from '../message';
import { AsyncMessageTypes } from '../types';
import { config } from '../ui/config';
import { storage } from './storage';

figma.showUI(__html__, {
  themeColors: true,
  height: 306,
  width: 275,
  title: 'DS Project',
});

AsyncMessage.plugin.handle(AsyncMessageTypes.GetAccessToken, async () => {
  const accessToken = await storage.get(config.TOKEN_KEY);

  if (!accessToken) {
    throw new Error('No access token found');
  }

  return { accessToken };
});

AsyncMessage.plugin.handle(
  AsyncMessageTypes.SetAccessToken,
  async (message) => {
    await storage.set(config.TOKEN_KEY, message.accessToken);

    return {};
  }
);

// figma.ui.on('message', (message: AsyncMessage) => {
//   (async () => {
//     switch (message.type) {
//       // case AsyncMessageType.GetAccessToken: {
//       //   const accessToken = await storage.get(config.TOKEN_KEY);
//       //   if (accessToken) {
//       //     postPluginMessage<
//       //       AsyncMessageType.GetAccessToken,
//       //       MessageGetAccessTokenResponse
//       //     >(AsyncMessageType.GetAccessToken, {
//       //       accessToken,
//       //     });
//       //   }
//       //   break;
//       // }

//       case AsyncMessageType.GetStyleDictionary: {
//         const styleDictionary = await getFigmaVariables();
//         postPluginMessage<
//           AsyncMessageType.GetStyleDictionary,
//           MessageStyleDictionaryResponse
//         >(AsyncMessageType.GetStyleDictionary, { styleDictionary });
//         break;
//       }

//       // case AsyncMessageType.InsertAccessToken: {
//       //   await storage.set(config.TOKEN_KEY, message.accessToken);
//       //   break;
//       // }

//       case AsyncMessageType.DeleteAccessToken: {
//         await storage.remove(config.TOKEN_KEY);
//         break;
//       }

//       default: {
//         // console.log(`🧩 Plugin Message type ${message.type} was ignored.`);
//       }
//     }
//     return message.type;
//   })()
//     .then((messageType: AsyncMessageType) => {
//       // eslint-disable-next-line no-console -- TODO: replace with monitoring
//       console.log(`🧩 Plugin Message type ${messageType} processed.`);
//     })
//     .catch((error) => {
//       // eslint-disable-next-line no-console -- TODO: replace with monitoring
//       console.log('🧩 Plugin Error.', error);
//     });
// });
