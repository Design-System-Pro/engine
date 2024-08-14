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
  linkProject: (projectId: string) => Promise<void>;
  getProjects: () => Promise<{
    projects: { id: string; name: string }[];
  }>;
  updateDesignTokens: (designTokens: DesignTokens) => Promise<void>;
}

const Context = createContext<ContextType>({
  getProjects: () => Promise.resolve({ projects: [] }),
  linkProject: () => Promise.resolve(),
  updateDesignTokens: () => Promise.resolve(),
});

export function DSApiProvider({ children }: { children: React.ReactNode }) {
  const [linkedProjectId, setLinkedProjectId] = useState<string>();
  const retryCountRef = useRef(0);
  const { fileName } = useConfig();
  const { accessToken, refreshAccessToken } = useAuth();

  useEffect(() => {
    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetProjectId,
      })
      .then(({ projectId }) => {
        if (!projectId) throw new Error('No design system linked found.');
        setLinkedProjectId(projectId);
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

  const getProjects = useCallback(async () => {
    const result = await apiFetch('/api/figma/design-systems/list', {
      method: 'GET',
    });

    if (!result.ok) throw new Error('Error fetching design systems');

    return (await result.json()) as {
      projects: { id: string; name: string }[];
    };
  }, [apiFetch]);

  const linkProject = useCallback(
    async (projectId: string) => {
      const response = await apiFetch('/api/figma/design-systems/link', {
        method: 'POST',
        body: JSON.stringify({
          projectId,
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
      const response = await apiFetch('/api/figma/design-tokens', {
        method: 'POST',
        body: JSON.stringify({
          projectId: linkedProjectId,
          designTokens,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    },
    [apiFetch, linkedProjectId]
  );

  const contextValue = useMemo<ContextType>(
    () => ({
      getProjects,
      linkProject,
      updateDesignTokens,
    }),
    [getProjects, linkProject, updateDesignTokens]
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
