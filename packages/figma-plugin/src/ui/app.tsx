import '@ds-project/components/globals.css';
import 'react-json-view-lite/dist/index.css';
import { useCallback, useEffect, useState } from 'react';
import { Button, DSLogo, Icons } from '@ds-project/components';
import { AsyncMessageTypes } from '../message.types';
import { AsyncMessage } from '../message';
import { config } from './config';
import { api } from './lib/api';

function App() {
  const [accessToken, setAccessToken] = useState<string>();
  const [waitingForToken, setWaitingForToken] = useState(false);
  const [state, setState] = useState<'IN-SYNC' | 'OUT-OF-SYNC'>();

  useEffect(() => {
    AsyncMessage.ui
      .request({ type: AsyncMessageTypes.GetAccessToken })
      .then(({ accessToken: _accessToken }) => {
        setAccessToken(_accessToken);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error requesting access token', error);
      });
  }, []);

  const logout = useCallback(() => {
    setAccessToken(undefined);
    void AsyncMessage.ui.request({ type: AsyncMessageTypes.DeleteAccessToken });
  }, []);

  const initSignIn = useCallback(() => {
    setWaitingForToken(true);
    // Announce intention to authenticate and grab the read and write keys
    api
      .getNewKeys()
      .then((data) => {
        // Opens the GitHub authentication page
        window.open(
          `${config.AUTH_API_HOST}/auth/login?figma_key=${data.writeKey}`
        );

        return data.readKey;
      })
      .then((readKey) => {
        // Polls for the authentication token
        const interval = setInterval(() => {
          api
            .getAccessToken(readKey)
            .then(({ accessToken: _accessToken }) => {
              if (_accessToken) {
                setAccessToken(_accessToken);
                clearInterval(interval);
              }
            })
            .catch(() => {
              // eslint-disable-next-line no-console -- TODO: replace with monitoring
              console.error('Error polling for GitHub token.');
            })
            .finally(() => {
              setWaitingForToken(false);
            });
        }, config.READ_INTERVAL);
      })
      .catch(() => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error initializing GitHub authentication.');
        setWaitingForToken(false);
      });
  }, []);

  useEffect(() => {
    // This is an authenticated request
    if (!accessToken) return;

    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetDesignTokens,
      })
      .then(api.updateDesignTokens)
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error updating design tokens', error);
      });
  }, [accessToken]);

  useEffect(() => {
    // Sends the authorization token to the Plugin and sets the API headers
    if (!accessToken) return;

    void AsyncMessage.ui.request({
      type: AsyncMessageTypes.SetAccessToken,
      accessToken,
    });

    api.setAuthorizationToken(accessToken);
  }, [accessToken]);

  return (
    <main className="flex size-full flex-col items-center justify-center gap-4">
      {/* <Button onClick={state === 'IN-SYNC' ? requestStatus : updateTokens}>
        <Icons.UpdateIcon className="mr-2" />{' '}
        {state === 'IN-SYNC'
          ? 'Up-to-date. Check status.'
          : 'Out-of-date. Update.'}
      </Button> */}
      {/* <Button onClick={updateTokens}>Update tokens</Button> */}
      {/* eslint-disable-next-line no-nested-ternary -- Intentional */}
      {accessToken ? (
        <Button onClick={logout}>
          <Icons.ExitIcon className="mr-2" /> Logout
        </Button>
      ) : waitingForToken ? (
        <p>Authenticating in the browser...</p>
      ) : (
        <Button onClick={initSignIn}>
          <DSLogo className="mr-2" /> Sign in with DS
        </Button>
      )}
    </main>
  );
}

export default App;
