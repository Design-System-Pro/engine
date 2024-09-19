import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getFigma } from '@/lib/figma';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!state) {
    throw new Error('No state provided');
  }

  if (!code) {
    throw new Error('No code provided');
  }

  try {
    const figma = await getFigma();
    await figma.exchangeCode({ code, state });
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error exchanging Figma code', error);
  }

  return NextResponse.redirect(origin);
}
