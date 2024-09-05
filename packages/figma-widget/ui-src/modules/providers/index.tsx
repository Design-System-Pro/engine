import { ApiProvider } from './api-provider';
import { AuthProvider } from './auth-provider';
import { ConfigProvider } from './config-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ApiProvider>
        <ConfigProvider>
          {/* <ProjectsProvider> */}
          {children}
          {/* </ProjectsProvider> */}
        </ConfigProvider>
      </ApiProvider>
    </AuthProvider>
  );
}
