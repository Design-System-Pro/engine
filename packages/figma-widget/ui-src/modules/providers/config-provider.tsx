import { createContext, useContext, useEffect, useState } from 'react';
import { AsyncMessageTypes, Message } from '@ds-project/figma-messaging';

interface ContextType {
  fileName?: string;
  projectId?: string;
}

const Context = createContext<ContextType>({});

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ContextType>();

  useEffect(() => {
    Message.ui
      .request({
        type: AsyncMessageTypes.GetConfig,
      })
      .then((_config) => {
        setConfig(_config);
      })
      .catch((error) => {
        console.error('Error fetching config from plugin', error);
      });
  }, []);

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
