import type { Credentials } from '@ds-project/figma-utilities';
import { useSyncedState } from '../lib/widget';

export const useSyncedCredentials = () => {
  return useSyncedState<Credentials | null>('credentials', null);
};

export const useSyncedLastSyncedAt = () => {
  return useSyncedState<string | null>('lastSyncedAt', null);
};

export const useCleanupSyncedState = () => {
  const [, setSyncedCredentials] = useSyncedCredentials();
  const [, setSyncedLastSyncedAt] = useSyncedLastSyncedAt();

  const cleanup = () => {
    setSyncedCredentials(null);
    setSyncedLastSyncedAt(null);
  };

  return cleanup;
};
