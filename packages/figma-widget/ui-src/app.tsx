import '@ds-project/components/globals.css';
import { useCallback, useEffect } from 'react';
import { Button, DSLogo, Icons } from '@ds-project/components';
import { LinkDesignSystem } from './modules/link-design-system';
import { useAuth } from './modules/providers/auth-provider';
import { useConfig } from './modules/providers/config-provider';
import { api } from '@ds-project/api/react';
import { useProjects } from './modules/providers/projects-provider';
import { AsyncMessageTypes, Message } from '@ds-project/figma-messaging';

function App() {
  const { login, logout, state } = useAuth();
  const { fileName } = useConfig();
  const { mutate: updateDesignTokens } =
    api.resources.updateDesignTokens.useMutation();
  const { selectedProjectId } = useProjects();

  const update = useCallback(() => {
    if (!fileName || state !== 'authorized') return;

    Message.ui
      .request({
        type: AsyncMessageTypes.GetDesignTokens,
      })
      .then(({ designTokens }) => {
        console.log({ designTokens });

        if (!selectedProjectId) return;

        void updateDesignTokens({
          designTokens,
          name: fileName,
          projectId: selectedProjectId,
        });
      })
      .catch((error) => {
        console.error('Error updating design tokens', error);
      });
  }, [fileName, selectedProjectId, state, updateDesignTokens]);

  useEffect(() => {
    void login();
  }, [login]);

  return (
    <main className="flex size-full flex-col items-center justify-center gap-4">
      {state === 'authorized' ? (
        <Button onClick={update}>
          <Icons.ReloadIcon className="mr-2" /> Update
        </Button>
      ) : null}
      {state === 'authorized' ? <LinkDesignSystem /> : null}
      {state === 'authorized' ? (
        <Button onClick={logout}>
          <Icons.ExitIcon className="mr-2" /> Logout
        </Button>
      ) : state === 'authorizing' ? (
        <p>Authenticating in the browser...</p>
      ) : (
        <Button onClick={login}>
          <DSLogo className="mr-2" /> Sign in with DS
        </Button>
      )}
    </main>
  );
}

export default App;
