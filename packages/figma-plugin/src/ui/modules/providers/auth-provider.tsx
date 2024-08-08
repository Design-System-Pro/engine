import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { config } from '../../config';
import type { Credentials } from '../../../types/credentials';
import { AsyncMessage } from '../../../message';
import { AsyncMessageTypes } from '../../../message.types';

interface AuthStartResponse {
  writeKey: string;
  readKey: string;
}

interface ContextType {
  accessToken?: string;
  refreshToken?: string;
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
  state: 'initializing',
  refreshAccessToken: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<
    'initializing' | 'authorizing' | 'authorized' | 'unauthorized' | 'failed'
  >('initializing');
  const [accessToken, setAccessToken] = useState<ContextType['accessToken']>();
  const [refreshToken, setRefreshToken] =
    useState<ContextType['refreshToken']>();
  const [shouldUpdatePlugin, setShouldUpdatePlugin] = useState(false);

  useEffect(() => {
    // Try to get credentials from plugin if they exist.
    // This will only run if the auth provider is just initializing.
    if (state !== 'initializing') {
      return;
    }

    AsyncMessage.ui
      .request({ type: AsyncMessageTypes.GetCredentials })
      .then(({ credentials }) => {
        setAccessToken(credentials.accessToken);
        setRefreshToken(credentials.refreshToken);
        setState('authorized');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error requesting credentials from plugin', error);
        setState('unauthorized');
      });
  }, [state]);

  useEffect(() => {
    // Try to update plugin with credentials if they got updated on ui side
    if (!shouldUpdatePlugin) {
      return;
    }

    if (state === 'authorized' && accessToken && refreshToken) {
      void AsyncMessage.ui.request({
        type: AsyncMessageTypes.SetCredentials,
        credentials: {
          accessToken,
          refreshToken,
        },
      });
    } else if (state === 'unauthorized' && !accessToken && !refreshToken) {
      void AsyncMessage.ui.request({
        type: AsyncMessageTypes.DeleteCredentials,
      });
    }

    setShouldUpdatePlugin(false);
  }, [accessToken, refreshToken, shouldUpdatePlugin, state]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      setAccessToken(undefined);
      setRefreshToken(undefined);
      setState('unauthorized');
      setShouldUpdatePlugin(true);
      return;
    }

    const response = await fetch(`${config.AUTH_API_HOST}/api/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      setAccessToken(undefined);
      setRefreshToken(undefined);
      setState('unauthorized');
      setShouldUpdatePlugin(true);
      return;
    }

    const credentials = (await response.json()) as Credentials;
    setAccessToken(credentials.accessToken);
    setRefreshToken(credentials.refreshToken);
    setState('authorized');
    setShouldUpdatePlugin(true);
  }, [refreshToken]);

  const logout = useCallback(async () => {
    await AsyncMessage.ui.request({
      type: AsyncMessageTypes.DeleteCredentials,
    });
    setAccessToken(undefined);
    setRefreshToken(undefined);
    setState('unauthorized');
    setShouldUpdatePlugin(true);
  }, []);

  const login = useCallback(async () => {
    setAccessToken(undefined);
    setRefreshToken(undefined);
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

      clearInterval(interval);

      const credentials = (await exchangeResponse.json()) as Credentials;

      setAccessToken(credentials.accessToken);
      setRefreshToken(credentials.refreshToken);
      setState('authorized');
      setShouldUpdatePlugin(true);
    }, config.READ_INTERVAL);
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      accessToken,
      refreshToken,
      refreshAccessToken,
      login,
      logout,
    }),
    [accessToken, login, logout, refreshAccessToken, refreshToken, state]
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
