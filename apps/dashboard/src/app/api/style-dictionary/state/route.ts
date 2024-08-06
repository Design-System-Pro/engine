import type { NextRequest } from 'next/server';
import { equals } from 'rambda';
import type { DesignTokens } from 'style-dictionary/types';
import { getTokens } from '@/lib/drizzle/utils';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response(null, {
      status: 401,
    });
  }

  const { styleDictionary } = (await request.json()) as {
    styleDictionary?: DesignTokens;
  };

  const githubTokens = await getTokens(request);

  const areTokensEqual = equals(styleDictionary, githubTokens);

  return new Response(
    JSON.stringify({
      state: areTokensEqual ? 'IN-SYNC' : 'OUT-OF-SYNC',
    }),
    {
      status: 200,
    }
  );
}
