import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { config } from '../../config';
import type { Credentials } from '@ds-project/figma-utilities';
import { CredentialsSchema, emit } from '@ds-project/figma-utilities';
import { useConfig } from './config-provider';

interface AuthStartResponse {
  writeKey: string;
  readKey: string;
}

interface ContextType {
  credentials: Credentials | null;
  state:
    | 'initializing'
    | 'authorizing'
    | 'authorized'
    | 'unauthorized'
    | 'failed';
  login: () => Promise<Credentials | null>;
  logout: () => void;
}

const Context = createContext<ContextType>({
  credentials: null,
  state: 'initializing',
  login: () => Promise.resolve(null),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { credentials: syncedCredentials } = useConfig();
  const [state, setState] = useState<
    'initializing' | 'authorizing' | 'authorized' | 'unauthorized' | 'failed'
  >('initializing');
  const [shouldUpdatePlugin, setShouldUpdatePlugin] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | null>(
    syncedCredentials
  );

  useEffect(() => {
    // Try to get credentials from plugin if they exist.
    // This will only run if the auth provider is just initializing.
    if (state !== 'initializing') {
      return;
    }

    if (credentials) {
      setState('authorized');
    } else {
      setState('unauthorized');
    }
  }, [credentials, state]);

  useEffect(() => {
    // Try to update plugin with credentials if they got updated on ui side
    if (!shouldUpdatePlugin) {
      return;
    }

    if (state === 'authorized' && credentials) {
      void emit('set-credentials', { credentials });
    } else if (state === 'unauthorized' && !credentials) {
      void emit('set-credentials', { credentials: null });
    }

    setShouldUpdatePlugin(false);
  }, [credentials, shouldUpdatePlugin, state]);

  const logout = useCallback(() => {
    setCredentials(null);
    setState('unauthorized');
    setShouldUpdatePlugin(true);
  }, []);

  const login = useCallback(async (): Promise<Credentials | null> => {
    setCredentials(null);
    setState('authorizing');
    setShouldUpdatePlugin(true);

    const startResponse = await fetch(`${config.API_HOST}/api/auth/start`, {
      method: 'POST',
    });

    if (!startResponse.ok) {
      setState('failed');
      throw new Error(startResponse.statusText);
    }

    const { writeKey, readKey } =
      (await startResponse.json()) as AuthStartResponse;

    window.open(`${config.API_HOST}/auth/sign-in?figma_key=${writeKey}`);

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises -- we want to use async function with interval
      const interval = setInterval(async () => {
        const exchangeResponse = await fetch(
          `${config.API_HOST}/api/auth/exchange`,
          {
            method: 'POST',
            body: JSON.stringify({ readKey }),
          }
        );

        if (!exchangeResponse.ok) {
          setState('failed');
          return reject(new Error('Error polling for DS token.'));
        }

        const { data: _credentials, success: areCredentialsValid } =
          CredentialsSchema.safeParse(await exchangeResponse.json());

        if (areCredentialsValid) {
          setCredentials(_credentials);
          setState('authorized');
          setShouldUpdatePlugin(true);
          clearInterval(interval);

          return resolve(_credentials);
        }

        return; // continue polling
      }, config.READ_INTERVAL);
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      credentials,
      login,
      logout,
    }),
    [credentials, login, logout, state]
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
