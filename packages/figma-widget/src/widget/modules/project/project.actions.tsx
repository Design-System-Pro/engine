import { Message, MessageType } from '@ds-project/figma-utilities';
import { useUI } from '../../hooks/ui';
import { useSyncedLinkedProject } from '../state';
import { useAuthActions } from '../auth/auth.actions';

export function useProjectActions() {
  const { open } = useUI();
  const [selectedProject] = useSyncedLinkedProject();
  const { isConnected } = useAuthActions();
  const isReady = isConnected;

  const selectProject = async () => {
    await open({ visible: true });

    await new Promise(() => {
      Message.widget.send({
        type: MessageType.OpenProjectsUI,
      });
    });
  };

  return {
    isReady,
    selectProject,
    selectedProject,
  };
}
