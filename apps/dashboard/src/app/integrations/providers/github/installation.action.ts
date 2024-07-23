import { database } from '@/lib/database';
import { integrationsTable } from '@/lib/database/schema';

export async function getInstallation() {
  const result = await database.select().from(integrationsTable);

  return result.at(0);
}
