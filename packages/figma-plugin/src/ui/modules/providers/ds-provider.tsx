import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AsyncMessage } from '../../../message';
import { AsyncMessageTypes } from '../../../message.types';
import { config } from '../../config';
import type { Credentials } from '../../../types/credentials';
import { DSApi } from '../../lib/ds-api';

interface ContextType {
  state:
    | 'initializing'
    | 'authenticating'
    | 'authenticated'
    | 'unauthenticated'
    | 'error';
  logout: () => void;
  login: () => void;
  api: DSApi;
}

const Context = createContext<ContextType>({
  state: 'unauthenticated',
  logout: () => undefined,
  login: () => undefined,
  api: new DSApi(),
});

const announceNewCredentialsToPlugin = (credentials: Credentials) => {
  // Send the credentials to the plugin when changed
  void AsyncMessage.ui.request({
    type: AsyncMessageTypes.SetCredentials,
    credentials,
  });
};

export function DSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ContextType['state']>('initializing');
  const { current: api } = useRef(new DSApi(announceNewCredentialsToPlugin));

  useEffect(() => {
    AsyncMessage.ui
      .request({ type: AsyncMessageTypes.GetCredentials })
      .then(({ credentials: _credentials }) => {
        api.init(_credentials);
        setState('authenticated');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error requesting access token', error);
      });
  }, [api]);

  const logout = useCallback(() => {
    setState('unauthenticated');
    void AsyncMessage.ui.request({ type: AsyncMessageTypes.DeleteCredentials });
    api.logout();
  }, [api]);

  const login = useCallback(() => {
    setState('authenticating');
    // Announce intention to authenticate and grab the read and write keys
    api
      .getNewKeys()
      .then(({ readKey, writeKey }) => {
        // Opens the GitHub authentication page
        window.open(`${config.AUTH_API_HOST}/auth/login?figma_key=${writeKey}`);

        return readKey;
      })
      .then((readKey) => {
        // Polls for the authentication token
        const interval = setInterval(() => {
          api
            .exchangeCredentials(readKey)
            .then(() => {
              setState('authenticated');
              clearInterval(interval);
            })
            .catch(() => {
              // eslint-disable-next-line no-console -- TODO: replace with monitoring
              console.error('Error polling for DS token.');
              clearInterval(interval);
            });
        }, config.READ_INTERVAL);
      })
      .catch(() => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error initializing DS authentication.');
        setState('error');
      });
  }, [api]);

  return (
    <Context.Provider
      value={{
        logout,
        state,
        login,
        api,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useDS() {
  const context = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- If provider is not available, this will be undefined
  if (!context) {
    throw new Error('useDS should be used within <DSProvider>');
  }

  const { login, logout, state, api } = context;

  return { logout, state, login, api };
}
