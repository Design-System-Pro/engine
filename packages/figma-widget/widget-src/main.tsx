import { Container } from './components/container';
import { Variables } from './components/variables';
import { registerWidget } from './lib/widget';

function Widget() {
  return (
    <Container>
      <Variables />
    </Container>
  );
}

registerWidget(Widget);
