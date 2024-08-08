import '@ds-project/components/globals.css';
import 'react-json-view-lite/dist/index.css';
import { useEffect } from 'react';
import { Button, DSLogo, Icons } from '@ds-project/components';
import { AsyncMessageTypes } from '../message.types';
import { AsyncMessage } from '../message';
import { useDSApi } from './modules/providers/ds-api-provider';
import { LinkDesignSystem } from './modules/link-design-system';
import { useAuth } from './modules/providers/auth-provider';

function App() {
  const { login, logout, state } = useAuth();
  const { updateDesignTokens } = useDSApi();

  useEffect(() => {
    // This is an authenticated request
    if (state !== 'authorized') return;

    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetDesignTokens,
      })
      .then(({ designTokens }) => {
        void updateDesignTokens(designTokens);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error updating design tokens', error);
      });
  }, [state, updateDesignTokens]);

  return (
    <main className="flex size-full flex-col items-center justify-center gap-4">
      <LinkDesignSystem />
      {/* eslint-disable-next-line no-nested-ternary -- Intentional */}
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
