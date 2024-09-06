import { Container } from './components/container';
import { registerWidget, useEffect } from './lib/widget';
import { closeUI, Message, MessageType } from '@ds-project/figma-messaging';
import { useSyncedLinkedProject } from './modules/state';
import { VariablesWidget } from './modules/variables.widget';
import { Project } from './modules/project.widget';

function Widget() {
  const [projectName] = useSyncedLinkedProject();

  useEffect(() => {
    Message.widget.handle(MessageType.GetConfig, async () => {
      const fileName = figma.root.name;
      return Promise.resolve({ fileName });
    });

    Message.widget.handle(MessageType.CloseUI, async () => {
      closeUI();
      return Promise.resolve({});
    });
  });

  return (
    <Container projectName={projectName?.name}>
      <Project />
      <VariablesWidget />
    </Container>
  );
}

registerWidget(Widget);
