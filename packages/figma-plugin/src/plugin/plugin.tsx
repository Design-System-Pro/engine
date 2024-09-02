import { AsyncMessage } from '../message';
import { AsyncMessageTypes } from '../message.types';
import { CredentialsSchema } from '../types/credentials';
import { config } from '../ui/config';
import { storage } from './storage';
import { extractDesignTokens } from './design-tokens/extract-design-tokens';
// This widget will open an Iframe window with buttons to show a toast message and close the window.

const { widget } = figma;
const { useEffect, Text, AutoLayout, Rectangle } = widget;

function Widget() {
  return (
    <AutoLayout
      direction="vertical"
      fill="#FFFFFF"
      cornerRadius={8}
      padding={16}
      width={300}
      height={200}
      verticalAlignItems="center"
      spacing={16}
    >
      <Text fontSize={24} fontWeight="bold">
        DS Pro
      </Text>

      {/* <ConnectButton /> */}

      <AutoLayout verticalAlignItems="baseline" height="fill-parent">
        <Text
          fontSize={12}
          fill="#0E1739"
          href="https://designsystemproject.pro"
        >
          Learn more about DS Pro
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);

AsyncMessage.plugin.handle(AsyncMessageTypes.GetConfig, async () => {
  const fileName = figma.root.name;
  return Promise.resolve({ fileName });
});

AsyncMessage.plugin.handle(AsyncMessageTypes.GetCredentials, async () => {
  const credentialsString = await storage.get(config.CREDENTIALS_KEY);
  const credentials = credentialsString
    ? CredentialsSchema.parse(JSON.parse(credentialsString))
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
      JSON.stringify(CredentialsSchema.parse(message.credentials))
    );

    return {};
  }
);

AsyncMessage.plugin.handle(AsyncMessageTypes.DeleteCredentials, async () => {
  await storage.remove(config.CREDENTIALS_KEY);

  return {};
});

AsyncMessage.plugin.handle(AsyncMessageTypes.GetDesignTokens, async () => {
  const designTokens = await extractDesignTokens();

  console.log({ designTokens });

  return {
    designTokens,
  };
});

AsyncMessage.plugin.handle(
  AsyncMessageTypes.SetProjectId,
  async ({ projectId }) => {
    await storage.set(config.PROJECT_ID_KEY, projectId);

    return {};
  }
);

AsyncMessage.plugin.handle(AsyncMessageTypes.GetProjectId, async () => {
  const projectId = (await storage.get(config.PROJECT_ID_KEY)) ?? undefined;

  return Promise.resolve({
    projectId,
  });
});
