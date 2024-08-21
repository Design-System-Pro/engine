import type { database } from '@ds-project/database/client';
import type { Account } from '@ds-project/database/schema';

export interface DSContext {
  database: typeof database;
  account: Account;
}
