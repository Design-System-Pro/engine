import { Container } from './components/container';
import { registerWidget } from './lib/widget';
import { AuthEvents } from './modules/auth/auth.events';
import { AuthWarning } from './modules/auth/auth-warning';
import { VariablesEvents } from './modules/variables/variables.events';
import { VariablesSync } from './modules/variables/variables-sync';

function Widget() {
  return (
    <Container>
      <AuthWarning />
      <VariablesSync />

      <AuthEvents />
      <VariablesEvents />
    </Container>
  );
}

registerWidget(Widget);
