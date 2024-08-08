import { AuthProvider } from './auth-provider';
import { ConfigProvider } from './config-provider';
import { DSApiProvider } from './ds-api-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ConfigProvider>
        <DSApiProvider>{children}</DSApiProvider>
      </ConfigProvider>
    </AuthProvider>
  );
}
