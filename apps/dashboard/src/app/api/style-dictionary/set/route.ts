import type { NextRequest } from 'next/server';
import * as z from 'zod';
import { isAuthenticated } from '@/lib/supabase/utils';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response(null, {
      status: 401,
    });
  }

  const Body = z.object({
    tokens: z.object({}),
  });

  const parsedBody = Body.safeParse(await request.json());

  if (!parsedBody.success) {
    return new Response(null, {
      status: 400,
    });
  }

  const { tokens } = parsedBody.data;

  console.log({ tokens });

  return new Response(null, {
    status: 200,
  });
}
