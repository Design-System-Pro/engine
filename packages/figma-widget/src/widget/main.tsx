/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Container } from './components/container';
import { registerWidget } from './lib/widget';
import { VariablesSync } from './modules/variables/variables-sync';
import { ProjectSelect } from './modules/project/project-select';
import { AuthEvents } from './modules/auth/auth.events';
import { ProjectEvents } from './modules/project/project.events';
import { VariablesEvents } from './modules/variables/variables.events';
import { ProjectWarning } from './modules/project/project-warning';
import { AuthWarning } from './modules/auth/auth-warning';

function Widget() {
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
