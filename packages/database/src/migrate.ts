import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { connection, database } from './migration-client.js';
import { sql } from 'drizzle-orm';

await migrate(database, {
  migrationsFolder: './migrations',
});

// Enable RLS for all tables created in the public schema, including the newly created ones
const enableRls = sql`
  DO $$
  DECLARE
      r RECORD;
  BEGIN
      -- Loop through all tables in the public schema
      FOR r IN
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE'
      LOOP
          -- Enable RLS for each table
          EXECUTE 'ALTER TABLE ' || quote_ident(r.table_name) || ' ENABLE ROW LEVEL SECURITY';
      END LOOP;
  END $$;
`;

await database.execute(enableRls);

await connection.end();
