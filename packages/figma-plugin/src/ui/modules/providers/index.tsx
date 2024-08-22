import { ApiProvider } from './api-provider';
import { AuthProvider } from './auth-provider';
import { ConfigProvider } from './config-provider';
import { TRPCReactProvider } from '@ds-project/api/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ApiProvider>
        <ConfigProvider>{children}</ConfigProvider>
      </ApiProvider>
    </AuthProvider>
  );
}
