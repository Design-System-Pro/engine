import { emit, once } from '@ds-project/figma-utilities';
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

    // TODO: because it's a visible ui, we need to wait for the user to select a project. Maybe we could do this differently
    await new Promise((resolve) => {
      emit('open-projects-ui', undefined);

      once('set-project', (project) => {
        console.log('project', project);
        setSyncedLinkedProject(project);
        close();
      });
    });
  };

  return {
    isReady,
    selectProject,
    selectedProject,
  };
}
