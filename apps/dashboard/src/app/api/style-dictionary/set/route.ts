import type { NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { updateDesignTokens } from '@/lib/supabase/server/utils/update-design-tokens';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response(null, {
      status: 401,
    });
  }

  try {
    await updateDesignTokens(request);
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error setting tokens', error);
  }

  return new Response(null, {
    status: 200,
  });
}
