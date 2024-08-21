import { TRPCReactProvider } from '../../lib/api';
import { AuthProvider } from './auth-provider';
import { ConfigProvider } from './config-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TRPCReactProvider>
        <ConfigProvider>{children}</ConfigProvider>
      </TRPCReactProvider>
    </AuthProvider>
  );
}
