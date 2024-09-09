import { ApiProvider } from './api-provider';
import { AuthProvider } from './auth-provider';
import { ConfigProvider } from './config-provider';
import { ProjectsProvider } from './projects-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider>
      <AuthProvider>
        <ApiProvider>
          <ProjectsProvider>{children}</ProjectsProvider>
        </ApiProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
