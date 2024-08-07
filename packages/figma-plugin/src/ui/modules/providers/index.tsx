import { ConfigProvider } from './config-provider';
import { DSProvider } from './ds-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <DSProvider>{children}</DSProvider>
    </ConfigProvider>
  );
}
