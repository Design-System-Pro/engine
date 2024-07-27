import '@ds-project/components/globals.css';
import 'react-json-view-lite/dist/index.css';
import { useCallback, useEffect, useState } from 'react';
import type { DesignTokens } from 'style-dictionary/types';
import { Button, DSLogo, Icons } from '@ds-project/components';
import type { PluginMessageEvent } from '../types';
import { MessageType } from '../types';
import { config } from './config';

function App() {
  const [_, setStyleDictionary] = useState<DesignTokens>();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: MessageType.UIReady } }, '*');
  }, []);

  useEffect(() => {
    window.addEventListener('message', (event: PluginMessageEvent) => {
      switch (event.data.pluginMessage.type) {
        case MessageType.LoadStyleDictionary: {
          setStyleDictionary(event.data.pluginMessage.styleDictionary);
          break;
        }

        case MessageType.LoadAccessToken: {
          setAccessToken(event.data.pluginMessage.token);
          break;
        }

        case MessageType.SetAccessToken:
        case MessageType.DeleteAccessToken:
        case MessageType.UIReady:
        default: {
          // eslint-disable-next-line no-console -- TODO: replace with monitoring
          console.log(
            `💅 Plugin UI Message type: ${event.data.pluginMessage.type} was ignored.`
          );
        }
      }
    });
  }, []);

  const logout = useCallback(() => {
    setAccessToken(undefined);
    parent.postMessage(
      { pluginMessage: { type: MessageType.DeleteAccessToken } },
      'https://www.figma.com'
    );
  }, []);

  const initSignIn = useCallback(() => {
    // Announce intention to authenticate and grab the read and write keys
    fetch(`${config.AUTH_API_HOST}/api/figma/init`, { method: 'POST' })
      .then((data) => data.json())
      .then((data: { writeKey: string; readKey: string }) => {
        // Opens the GitHub authentication page
        window.open(
          `${config.AUTH_API_HOST}/auth/login?figma_key=${data.writeKey}`
        );

        return data.readKey;
      })
      .then((readKey) => {
        // Polls for the authentication token
        const interval = setInterval(() => {
          fetch(`${config.AUTH_API_HOST}/api/figma/read`, {
            method: 'POST',
            body: JSON.stringify({ readKey }),
          })
            .then((data) => data.json())
            .then(({ token }: { token: string }) => {
              if (token) {
                setAccessToken(token);
                parent.postMessage(
                  {
                    pluginMessage: { type: MessageType.SetAccessToken, token },
                  },
                  'https://www.figma.com'
                );
                clearInterval(interval);
              }
            })
            .catch(() => {
              // eslint-disable-next-line no-console -- TODO: replace with monitoring
              console.error('Error polling for GitHub token.');
            });
        }, config.READ_INTERVAL);
      })
      .catch(() => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error initializing GitHub authentication.');
      });
  }, []);

  return (
    <main className="flex size-full items-center justify-center">
      {accessToken ? (
        <Button onClick={logout}>
          <Icons.ExitIcon className="mr-2" /> Logout
        </Button>
      ) : (
        <Button onClick={initSignIn}>
          <DSLogo className="mr-2" /> Sign in with DS
        </Button>
      )}
    </main>
  );
}

export default App;
