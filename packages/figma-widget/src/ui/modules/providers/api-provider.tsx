import { TRPCReactProvider } from '@ds-project/api/react';
import { useAuth } from './auth-provider';

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { credentials } = useAuth();

  return (
    <TRPCReactProvider accessToken={credentials?.apiKey} source="figma">
      {children}
    </TRPCReactProvider>
  );
}
