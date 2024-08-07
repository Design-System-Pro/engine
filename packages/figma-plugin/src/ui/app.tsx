import '@ds-project/components/globals.css';
import 'react-json-view-lite/dist/index.css';
import { useEffect } from 'react';
import { Button, DSLogo, Icons } from '@ds-project/components';
import { AsyncMessageTypes } from '../message.types';
import { AsyncMessage } from '../message';
import { useDS } from './modules/providers/ds-provider';
import { LinkDesignSystem } from './modules/link-design-system';

function App() {
  const { logout, login, state, api } = useDS();

  useEffect(() => {
    // This is an authenticated request
    if (state !== 'authenticated') return;

    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetDesignTokens,
      })
      .then(({ designTokens, fileId }) => {
        void api.updateDesignTokens({ designTokens, fileId });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error updating design tokens', error);
      });
  }, [api, state]);

  return (
    <main className="flex size-full flex-col items-center justify-center gap-4">
      <LinkDesignSystem />
      {/* eslint-disable-next-line no-nested-ternary -- Intentional */}
      {state === 'authenticated' ? (
        <Button onClick={logout}>
          <Icons.ExitIcon className="mr-2" /> Logout
        </Button>
      ) : state === 'authenticating' ? (
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
