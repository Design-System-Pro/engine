import '@ds-project/components/globals.css';
import 'react-json-view-lite/dist/index.css';
import { useEffect } from 'react';
import { Button, DSLogo, Icons } from '@ds-project/components';
import { AsyncMessageTypes } from '../message.types';
import { AsyncMessage } from '../message';
import { LinkDesignSystem } from './modules/link-design-system';
import { useAuth } from './modules/providers/auth-provider';
import { useConfig } from './modules/providers/config-provider';
import { api } from '@ds-project/api/react';

function App() {
  const { login, logout, state } = useAuth();
  const { fileName } = useConfig();
  const { mutate: updateDesignTokens } =
    api.resources.updateDesignTokens.useMutation();

  useEffect(() => {
    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetDesignTokens,
      })
      .then(({ designTokens }) => {
        console.log({ designTokens });
        if (fileName) {
          // void updateDesignTokens({ designTokens, name: fileName });
        }
      })
      .catch((error) => {
        console.error('Error updating design tokens', error);
      });
  }, [fileName, state, updateDesignTokens]);

  return (
    <main className="flex size-full flex-col items-center justify-center gap-4">
      {state === 'authorized' ? <LinkDesignSystem /> : null}
      {state === 'authorized' ? (
        <Button onClick={logout}>
          <Icons.ExitIcon className="mr-2" /> Logout
        </Button>
      ) : state === 'authorizing' ? (
        <p>Authenticating in the browser...</p>
      ) : (
        <Button onClick={login}>
          <DSLogo className="mr-2" /> Sign in with DS
        </Button>
      )}
    </main>
  );
}

export default App;
