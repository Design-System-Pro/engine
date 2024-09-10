import { useAuthActions } from '../auth/auth.actions';
import { useSyncedLinkedProject } from '../state';

export function ProjectEvents() {
  const [_, setSyncedLinkedProject] = useSyncedLinkedProject();
  useAuthActions({
    onDisconnect: () => {
      setSyncedLinkedProject(null);
    },
  });

  return null;
}
