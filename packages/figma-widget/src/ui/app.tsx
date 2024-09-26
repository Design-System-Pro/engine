import { useEffect } from 'react';
import { Auth } from './modules/auth';
import { emit } from '@ds-project/figma-utilities';
import { VariablesUI } from './modules/variables.ui';
import { ProjectUI } from './modules/project/project.ui';
import { Container } from './components/container';

export function App() {
  useEffect(() => {
    // Announce to the plugin that the UI is ready to receive messages
    return emit('ui-is-ready', undefined);
  }, []);

  return (
    <Container>
      <Auth />
      <ProjectUI />
      <VariablesUI />
    </Container>
  );
}
