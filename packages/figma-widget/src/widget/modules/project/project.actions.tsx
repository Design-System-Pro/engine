import { requestAsync } from '@ds-project/figma-utilities';
import { useUI } from '../../hooks/ui';
import { useSyncedLinkedProject } from '../state';
import { useAuthActions } from '../auth/auth.actions';

export function useProjectActions() {
  const { open, close } = useUI();
  const [selectedProject, setSyncedLinkedProject] = useSyncedLinkedProject();
  const { isConnected } = useAuthActions();
  const isReady = isConnected;

  const selectProject = async () => {
    await open({ visible: true });

    try {
      const project = await requestAsync('set-project', undefined);
      setSyncedLinkedProject(project);
    } finally {
      close();
    }
  };

  return {
    isReady,
    selectProject,
    selectedProject,
  };
}
