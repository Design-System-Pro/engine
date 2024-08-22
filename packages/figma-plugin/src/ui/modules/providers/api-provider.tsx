import { useMemo } from 'react';
import { TRPCReactProvider } from '@ds-project/api/react';
import { useAuth } from './auth-provider';
import { tokenRefreshLink } from 'trpc-token-refresh-link';
import type { AppRouter } from '../../../../../api/src/app-router';

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { credentials, refreshAccessToken, logout } = useAuth();

  const authTrpcLink = useMemo(
    () =>
      tokenRefreshLink<AppRouter>({
        tokenRefreshNeeded: () => {
          if (!credentials) {
            return false;
          }

          return credentials.expiresAt < Math.floor(Date.now() / 1000);
        },
        fetchAccessToken: async () => {
          try {
            void refreshAccessToken();
          } catch (error) {
            await logout();
          }
        },
      }),
    [credentials, logout, refreshAccessToken]
  );

  return (
    <TRPCReactProvider
      accessToken={credentials?.accessToken}
      source="figma"
      trpcLinks={[authTrpcLink]}
    >
      {children}
    </TRPCReactProvider>
  );
}
