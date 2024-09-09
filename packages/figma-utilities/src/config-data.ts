import type { Credentials } from './credentials';

export interface ConfigData extends Record<string, unknown> {
  fileName: string | null;
  projectId: string | null;
  credentials: Credentials | null;
}
