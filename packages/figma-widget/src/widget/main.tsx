/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Container } from './components/container';
import { registerWidget, useEffect } from './lib/widget';
import { VariablesSync } from './modules/variables/variables-sync';
import { ProjectSelect } from './modules/project/project-select';
import { useUI } from './hooks/ui';
import { AuthEvents } from './modules/auth/auth.events';
import { ProjectEvents } from './modules/project/project.events';
import { VariablesEvents } from './modules/variables/variables.events';
import { ProjectWarning } from './modules/project/project-warning';
import { AuthWarning } from './modules/auth/auth-warning';
import { Message, MessageType } from '@ds-project/figma-utilities';

function Widget() {
  const { close } = useUI();

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
    <Container projectNode={<ProjectSelect />}>
      <AuthWarning />
      <ProjectWarning />
      <VariablesSync />

      <AuthEvents />
      <ProjectEvents />
      <VariablesEvents />
    </Container>
  );
}

registerWidget(Widget);
