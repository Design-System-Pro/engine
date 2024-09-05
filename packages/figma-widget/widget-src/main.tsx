import { Container } from './components/container';
import { registerWidget } from './lib/widget';
import { LinkProject } from './modules/link-project';

function Widget() {
  return (
    <Container>
      <LinkProject />
      {/* <SyncVariables /> */}
    </Container>
  );
}

registerWidget(Widget);
