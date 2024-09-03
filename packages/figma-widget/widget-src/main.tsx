import type { Credentials } from '@ds-project/figma-messaging';
import { AsyncMessageTypes, Message } from '@ds-project/figma-messaging';
import { Button } from './components/button';
import { Container } from './components/container';

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
    <Container>
      <Text fontSize={16} horizontalAlignText="center" fill="#000000">
        {credentials ? 'DS Connected' : 'Connect with DS'}
      </Text>
      <Button onClick={handleUIInteraction}>
        {credentials ? 'Open UI' : 'Connect'}
      </Button>
    </Container>
  );
}

widget.register(Widget);
