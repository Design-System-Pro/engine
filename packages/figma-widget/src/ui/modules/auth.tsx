import '@ds-project/components/globals.css';

import { useAuth } from './providers/auth-provider';
import { useEffect } from 'react';
import { handle } from '@ds-project/figma-utilities';

export function Auth() {
  const { login } = useAuth();

  useEffect(() => {
    return handle('connect', async () => {
      console.log('💅 Auth: Performing login');
      const credentials = await login();

      return {
        credentials,
      };
    });
  }, [login]);

  return null;
}
