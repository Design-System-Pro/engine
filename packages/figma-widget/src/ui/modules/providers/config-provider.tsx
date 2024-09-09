import { createContext, useContext } from 'react';
import type { ConfigData } from '@ds-project/figma-messaging';

const Context = createContext<ConfigData>({
  credentials: null,
  fileName: null,
  projectId: null,
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const config = window.__SHOW_UI_DATA__;

  console.log(JSON.stringify(config, null, 2));

  return <Context.Provider value={{ ...config }}>{children}</Context.Provider>;
}

export function useConfig() {
  const context = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- If provider is not available, this will be undefined
  if (!context) {
    throw new Error('useConfig should be used within <ConfigProvider>');
  }

  return context;
}
