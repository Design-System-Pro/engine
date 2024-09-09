import { closeUI, openUI } from '@ds-project/figma-messaging';
import { useSyncedCredentials, useSyncedLinkedProject } from '../modules/state';
export function useUI() {
  const [syncedLinkedProject] = useSyncedLinkedProject();
  const [syncedCredentials] = useSyncedCredentials();

  const open = async () => {
    return await openUI({
      projectId: syncedLinkedProject?.id ?? null,
      fileName: figma.root.name,
      credentials: syncedCredentials,
    });
  };

  const close = () => {
    closeUI();
  };

  return {
    open,
    close,
  };
}
