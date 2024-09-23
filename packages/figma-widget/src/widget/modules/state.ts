import type { Credentials } from '@ds-project/figma-utilities';
import { useSyncedState } from '../lib/widget';

export const useSyncedCredentials = () => {
  return useSyncedState<Credentials | null>('credentials', null);
};

export const useSyncedLinkedProject = () => {
  return useSyncedState<{ name: string; id: string } | null>(
    'projectName',
    null
  );
};

export const useSyncedLastSyncedAt = () => {
  return useSyncedState<number | null>('lastSyncedAt', null);
};

export const useCleanupSyncedState = () => {
  const [, setSyncedCredentials] = useSyncedCredentials();
  const [, setSyncedLinkedProject] = useSyncedLinkedProject();
  const [, setSyncedLastSyncedAt] = useSyncedLastSyncedAt();

  const cleanup = () => {
    setSyncedCredentials(null);
    setSyncedLinkedProject(null);
    setSyncedLastSyncedAt(null);
  };

  return cleanup;
};
