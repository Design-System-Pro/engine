import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { connection, database } from './client';

migrate(database, {
  migrationsFolder: './src/migrations',
})
  .catch((error) => {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error running migrations', error);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/unbound-method -- Expected
  .finally(connection.end);
