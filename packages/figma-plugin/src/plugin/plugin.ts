import { AsyncMessage } from '../message';
import { AsyncMessageTypes } from '../message.types';
import type { Credentials } from '../types/credentials';
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

AsyncMessage.plugin.handle(AsyncMessageTypes.GetConfig, async () => {
  const fileName = figma.root.name;
  return Promise.resolve({ fileName });
});

AsyncMessage.plugin.handle(AsyncMessageTypes.GetCredentials, async () => {
  const credentialsString = await storage.get(config.CREDENTIALS_KEY);
  const credentials = credentialsString
    ? (JSON.parse(credentialsString) as Credentials)
    : null;
  if (!credentials) {
    throw new Error('No DS Credentials found');
  }

  return { credentials };
});

AsyncMessage.plugin.handle(
  AsyncMessageTypes.SetCredentials,
  async (message) => {
    await storage.set(
      config.CREDENTIALS_KEY,
      JSON.stringify(message.credentials)
    );

    return {};
  }
);

AsyncMessage.plugin.handle(AsyncMessageTypes.DeleteCredentials, async () => {
  await storage.remove(config.CREDENTIALS_KEY);

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

AsyncMessage.plugin.handle(
  AsyncMessageTypes.SetDesignSystem,
  async ({ designSystemId }) => {
    await storage.set(config.DESIGN_SYSTEM_ID_KEY, designSystemId);

    return {};
  }
);

AsyncMessage.plugin.handle(AsyncMessageTypes.GetDesignSystem, async () => {
  const designSystemId =
    (await storage.get(config.DESIGN_SYSTEM_ID_KEY)) ?? undefined;

  return Promise.resolve({
    designSystemId,
  });
});
