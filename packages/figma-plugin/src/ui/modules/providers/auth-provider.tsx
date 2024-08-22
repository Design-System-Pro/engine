import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { config } from '../../config';
import { CredentialsSchema } from '../../../types/credentials';
import type { Credentials } from '../../../types/credentials';
import { AsyncMessage } from '../../../message';
import { AsyncMessageTypes } from '../../../message.types';

interface AuthStartResponse {
  writeKey: string;
  readKey: string;
}

interface ContextType {
  credentials: Credentials | undefined;
  state:
    | 'initializing'
    | 'authorizing'
    | 'authorized'
    | 'unauthorized'
    | 'failed';
  refreshAccessToken: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const Context = createContext<ContextType>({
  credentials: undefined,
  state: 'initializing',
  refreshAccessToken: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<
    'initializing' | 'authorizing' | 'authorized' | 'unauthorized' | 'failed'
  >('initializing');
  const [shouldUpdatePlugin, setShouldUpdatePlugin] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>();

  useEffect(() => {
    // Try to get credentials from plugin if they exist.
    // This will only run if the auth provider is just initializing.
    if (state !== 'initializing') {
      return;
    }

    AsyncMessage.ui
      .request({ type: AsyncMessageTypes.GetCredentials })
      .then(({ credentials: _credentials }) => {
        setCredentials(_credentials);
        setState('authorized');
      })
      .catch((error) => {
        console.error('Error requesting credentials from plugin', error);
        setState('unauthorized');
      });
  }, [state]);

  useEffect(() => {
    // Try to update plugin with credentials if they got updated on ui side
    if (!shouldUpdatePlugin) {
      return;
    }

    if (state === 'authorized' && credentials) {
      void AsyncMessage.ui.request({
        type: AsyncMessageTypes.SetCredentials,
        credentials,
      });
    } else if (state === 'unauthorized' && !credentials) {
      void AsyncMessage.ui.request({
        type: AsyncMessageTypes.DeleteCredentials,
      });
    }

    setShouldUpdatePlugin(false);
  }, [credentials, shouldUpdatePlugin, state]);

  const refreshAccessToken = useCallback(async () => {
    if (!credentials) {
      setCredentials(undefined);
      setState('unauthorized');
      setShouldUpdatePlugin(true);
      return;
    }

    const response = await fetch(`${config.AUTH_API_HOST}/api/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: credentials.refreshToken }),
    });

    if (!response.ok) {
      setCredentials(undefined);
      setState('unauthorized');
      setShouldUpdatePlugin(true);
      return;
    }

    const { data: _credentials, success: areCredentialsValid } =
      CredentialsSchema.safeParse(await response.json());

    if (areCredentialsValid) {
      setCredentials(_credentials);
      setState('authorized');
      setShouldUpdatePlugin(true);
    }
  }, [credentials]);

  const logout = useCallback(async () => {
    await AsyncMessage.ui.request({
      type: AsyncMessageTypes.DeleteCredentials,
    });
    setCredentials(undefined);
    setState('unauthorized');
    setShouldUpdatePlugin(true);
  }, []);

  const login = useCallback(async () => {
    setCredentials(undefined);
    setState('authorizing');
    setShouldUpdatePlugin(true);

    const startResponse = await fetch(
      `${config.AUTH_API_HOST}/api/auth/start`,
      {
        method: 'POST',
      }
    );

    if (!startResponse.ok) {
      setState('failed');
      throw new Error(startResponse.statusText);
    }

    const { writeKey, readKey } =
      (await startResponse.json()) as AuthStartResponse;

    window.open(`${config.AUTH_API_HOST}/auth/login?figma_key=${writeKey}`);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- we want to use async function with interval
    const interval = setInterval(async () => {
      const exchangeResponse = await fetch(
        `${config.AUTH_API_HOST}/api/auth/exchange`,
        {
          method: 'POST',
          body: JSON.stringify({ readKey }),
        }
      );

      if (!exchangeResponse.ok) {
        setState('failed');
        throw new Error('Error polling for DS token.');
      }

      const { data: _credentials, success: areCredentialsValid } =
        CredentialsSchema.safeParse(await exchangeResponse.json());

      if (areCredentialsValid) {
        setCredentials(_credentials);
        setState('authorized');
        setShouldUpdatePlugin(true);
        clearInterval(interval);
      }
    }, config.READ_INTERVAL);
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      credentials,
      refreshAccessToken,
      login,
      logout,
    }),
    [credentials, login, logout, refreshAccessToken, state]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useAuth() {
  const context = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- If provider is not available, this will be undefined
  if (!context) {
    throw new Error('useAuth should be used within <ConfigProvider>');
  }

  return context;
}
