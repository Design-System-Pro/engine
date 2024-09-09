import '@ds-project/components/globals.css';

import { useAuth } from './providers/auth-provider';
import { useEffect } from 'react';
import { Message, MessageType } from '@ds-project/figma-utilities';

export function Auth() {
  const { login } = useAuth();

  useEffect(() => {
    Message.ui.handle(MessageType.Connect, async () => {
      console.log('💅 Auth: Performing login');
      const credentials = await login();

      return {
        credentials,
      };
    });
  });

  return null;
}
