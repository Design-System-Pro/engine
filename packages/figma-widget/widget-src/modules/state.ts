import type { Credentials } from '@ds-project/figma-messaging';
import { useSyncedState } from '../lib/widget';

export const useSyncedCredentials = () => {
  return useSyncedState<Credentials | null>('credentials', null);
};

export const useSyncedProjectName = () => {
  return useSyncedState<string | undefined>('projectName', undefined);
};
