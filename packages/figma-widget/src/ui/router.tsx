import { useEffect } from 'react';
import { Auth } from './modules/auth';
import { MessageType, Message } from '@ds-project/figma-utilities';
import { VariablesUI } from './modules/variables.ui';
import { ProjectUI } from './modules/project/project.ui';
import { Container } from './components/container';

export function Router() {
  useEffect(() => {
    // Announce to the plugin that the UI is ready to receive messages
    void Message.ui.send({
      type: MessageType.UIIsReady,
    });
  }, []);

  return (
    <Container>
      <Auth />
      <ProjectUI />
      <VariablesUI />
    </Container>
  );
}
