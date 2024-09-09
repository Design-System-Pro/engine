import { Message, MessageType } from '@ds-project/figma-messaging';
import { useUI } from '../../hooks/ui';
import { useSyncedLinkedProject } from '../state';
import { useAuthActions } from '../auth/auth.actions';

export function useProjectActions() {
  const { open } = useUI();
  const [selectedProject] = useSyncedLinkedProject();
  const { isConnected } = useAuthActions();
  const isReady = isConnected;

  const selectProject = async () => {
    await new Promise(() => {
      // TODO: move this open to an await/async call?
      open()
        .then(() => {
          void Message.widget.send({
            type: MessageType.OpenLinkProject,
          });
        })
        .catch((error) => {
          console.error('Error opening UI', error);
        });
    });
  };

  return {
    isReady,
    selectProject,
    selectedProject,
  };
}
