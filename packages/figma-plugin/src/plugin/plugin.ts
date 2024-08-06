import { AsyncMessage } from '../message';
import { AsyncMessageTypes } from '../message.types';
import { config } from '../ui/config';
import { storage } from './storage';
import { getFileId } from './variables/get-file-id';
import { getFigmaVariables } from './variables/utils/get-figma-variables';

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

AsyncMessage.plugin.handle(AsyncMessageTypes.DeleteAccessToken, async () => {
  await storage.remove(config.TOKEN_KEY);

  return {};
});

AsyncMessage.plugin.handle(AsyncMessageTypes.GetDesignTokens, async () => {
  const styleDictionary = await getFigmaVariables();
  const fileId = await getFileId();

  if (!fileId) {
    throw new Error('No file id found');
  }

  return {
    fileId,
    designTokens: styleDictionary,
  };
});
