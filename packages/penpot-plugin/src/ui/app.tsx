import { useEffect } from 'react';
import { emit } from '@ds-project/figma-utilities';

export function App() {
  useEffect(() => {
    // Announce to the plugin that the UI is ready to receive messages
    return emit('ui-is-ready', undefined);
  }, []);

  return <h1>Hello from React</h1>;
}
