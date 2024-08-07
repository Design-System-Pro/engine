import type { NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { database } from '@/lib/drizzle';
import { getUserAccount } from '@/lib/supabase/server/utils/get-user-account';
import { designSystemsTable } from '@/lib/drizzle/schema';

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response('Not authenticated', { status: 401 });
  }

  const userAccount = await getUserAccount(request);
  const designSystemId = userAccount?.designSystemId;

  if (!designSystemId) {
    return new Response('No design system associated with this account', {
      status: 404,
    });
  }

  const designSystems = await database
    .select({
      id: designSystemsTable.id,
      name: designSystemsTable.name,
    })
    .from(designSystemsTable);

  return new Response(
    JSON.stringify({
      designSystems,
    }),
    { status: 200 }
  );
}
