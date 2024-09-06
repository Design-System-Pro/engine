import { Container } from './components/container';
import { registerWidget, useEffect } from './lib/widget';
import { Message, MessageType } from '@ds-project/figma-messaging';
import { useSyncedLinkedProject } from './modules/state';
import { VariablesWidget } from './modules/variables.widget';
import { Project } from './modules/project.widget';
import { useUI } from './hooks/ui';

function Widget() {
  const { close } = useUI();
  const [projectName] = useSyncedLinkedProject();

  useEffect(() => {
    Message.widget.handle(MessageType.GetConfig, async () => {
      const fileName = figma.root.name;
      return Promise.resolve({ fileName });
    });

    Message.widget.handle(MessageType.CloseUI, async () => {
      close();
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
