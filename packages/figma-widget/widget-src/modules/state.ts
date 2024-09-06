import type { Credentials } from '@ds-project/figma-messaging';
import { useSyncedState } from '../lib/widget';

export const useSyncedCredentials = () => {
  return useSyncedState<Credentials | null>('credentials', null);
};

export const useSyncedLinkedProject = () => {
  return useSyncedState<{ name: string; id: string } | undefined>(
    'projectName',
    undefined
  );
};

export const useSyncedLastSyncedAt = () => {
  return useSyncedState<number | undefined>('lastSyncedAt', undefined);
};
