import { TRPCReactProvider } from '@ds-project/api/react';
import { useAuth } from './auth-provider';
import { config } from '../../config';

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { credentials } = useAuth();

  return (
    <TRPCReactProvider
      accessToken={credentials?.apiKey}
      source="figma"
      baseUrl={config.API_HOST}
    >
      {children}
    </TRPCReactProvider>
  );
}
