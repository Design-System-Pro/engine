import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { DesignTokens } from 'style-dictionary/types';
import { AsyncMessage } from '../../../message';
import { AsyncMessageTypes } from '../../../message.types';
import { config } from '../../config';
import { useAuth } from './auth-provider';
import { useConfig } from './config-provider';

interface ContextType {
  linkDesignSystem: (designSystemId: string) => Promise<void>;
  getDesignSystems: () => Promise<{
    designSystems: { id: string; name: string }[];
  }>;
  updateDesignTokens: (designTokens: DesignTokens) => Promise<void>;
}

const Context = createContext<ContextType>({
  getDesignSystems: () => Promise.resolve({ designSystems: [] }),
  linkDesignSystem: () => Promise.resolve(),
  updateDesignTokens: () => Promise.resolve(),
});

export function DSApiProvider({ children }: { children: React.ReactNode }) {
  const [linkedDesignSystemId, setLinkedDesignSystemId] = useState<string>();
  const retryCountRef = useRef(0);
  const { fileName } = useConfig();
  const { accessToken, refreshAccessToken } = useAuth();

  useEffect(() => {
    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetDesignSystem,
      })
      .then(({ designSystemId }) => {
        if (!designSystemId) throw new Error('No design system linked found.');
        setLinkedDesignSystemId(designSystemId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design system from plugin', error);
      });
  }, []);

  const apiFetch = useCallback(
    async (path: string, init?: RequestInit): ReturnType<typeof fetch> => {
      const response = await fetch(`${config.AUTH_API_HOST}${path}`, {
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...init?.headers,
        },
        ...init,
      });

      if (response.status === 401 && retryCountRef.current === 0) {
        // The token is invalid or expired, so we need to refresh it, but only if we haven't retried yet and the state of the api is 'ready'
        await refreshAccessToken();

        // Try the request again
        retryCountRef.current += 1;
        return apiFetch(path, init);
      }

      retryCountRef.current = 0;
      return response;
    },
    [accessToken, refreshAccessToken]
  );

  const getDesignSystems = useCallback(async () => {
    const result = await apiFetch('/api/figma/design-systems/list', {
      method: 'GET',
    });

    if (!result.ok) throw new Error('Error fetching design systems');

    return (await result.json()) as {
      designSystems: { id: string; name: string }[];
    };
  }, [apiFetch]);

  const linkDesignSystem = useCallback(
    async (designSystemId: string) => {
      const response = await apiFetch('/api/figma/design-systems/link', {
        method: 'POST',
        body: JSON.stringify({
          designSystemId,
          fileName,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    },
    [apiFetch, fileName]
  );

  const updateDesignTokens = useCallback(
    async (designTokens: DesignTokens) => {
      console.log({ designTokens });

      const response = await apiFetch('/api/figma/design-tokens', {
        method: 'POST',
        body: JSON.stringify({
          designSystemId: linkedDesignSystemId,
          designTokens,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    },
    [apiFetch, linkedDesignSystemId]
  );

  const contextValue = useMemo<ContextType>(
    () => ({
      getDesignSystems,
      linkDesignSystem,
      updateDesignTokens,
    }),
    [getDesignSystems, linkDesignSystem, updateDesignTokens]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useDSApi() {
  const context = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- If provider is not available, this will be undefined
  if (!context) {
    throw new Error('useDS should be used within <DSProvider>');
  }

  return context;
}
