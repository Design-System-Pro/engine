import type { createServerClient } from '@ds-project/auth/server';
import type {
  Database,
  DatabaseConnection,
  DatabaseTransaction,
} from '@ds-project/database';
import type { Account } from '@ds-project/database/schema';

export interface BaseContext {
  supabase: Awaited<ReturnType<typeof createServerClient<Database>>>;
  userId?: string;
  authRole: 'api' | 'browser';
  database: DatabaseConnection | DatabaseTransaction;
}

export interface AuthenticatedContext extends BaseContext {
  account: Account;
}
