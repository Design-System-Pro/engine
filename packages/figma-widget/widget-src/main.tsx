import type { Credentials } from '@ds-project/figma-messaging';
import { AsyncMessageTypes, Message } from '@ds-project/figma-messaging';
import { Button } from './components/button';

const { widget } = figma;
// eslint-disable-next-line @typescript-eslint/unbound-method
const { AutoLayout, Text, useSyncedState } = widget;

function Widget() {
  const [credentials, setCredentials] = useSyncedState<Credentials | null>(
    'credentials',
    null
  );

  const handleUIInteraction = async () => {
    await new Promise(() => {
      figma.showUI(__html__, {
        themeColors: true,
        height: 306,
        width: 275,
        title: 'DS Project',
        visible: true,
      });

      Message.widget.handle(AsyncMessageTypes.CloseUI, () => {
        figma.closePlugin();
        return Promise.resolve({});
      });

      Message.widget.handle(AsyncMessageTypes.GetCredentials, async () => {
        return Promise.resolve({ credentials });
      });

      Message.widget.handle(
        AsyncMessageTypes.SetCredentials,
        async ({ credentials: _credentials }) => {
          setCredentials(_credentials);
          return Promise.resolve({});
        }
      );
    });
  };

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      width={200}
      padding={16}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
    >
      <Text fontSize={16} horizontalAlignText="center" fill="#000000">
        {credentials ? 'DS Connected' : 'Connect with DS'}
      </Text>
      <Button onClick={handleUIInteraction}>
        {credentials ? 'Open UI' : 'Connect'}
      </Button>
    </AutoLayout>
  );
}

widget.register(Widget);
