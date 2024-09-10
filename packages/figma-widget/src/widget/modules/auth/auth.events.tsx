import { on } from '@ds-project/figma-utilities';
import { useSyncedCredentials } from '../state';

export function AuthEvents() {
  const [_, setSyncedCredentials] = useSyncedCredentials();

  on('set-credentials', ({ credentials }) => {
    console.log('handling set-credentials', credentials);
    setSyncedCredentials(credentials);
  });

  return null;
}
