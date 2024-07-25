import { NextResponse } from 'next/server';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { config } from '@/config';
import { database } from '@/lib/database';
import { integrationsTable } from '@/lib/database/schema';

const auth = createOAuthAppAuth({
  clientType: 'github-app',
  clientId: config.github.appClientId,
  clientSecret: config.github.appClientSecret,
});

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  // const code = searchParams.get('code');
  const installationId = searchParams.get('installation_id');

  if (!installationId) throw new Error('No installation id provided');

  try {
    // Validate code
    // await auth({ type: 'oauth-user', code });

    // Register installation id
    await database.insert(integrationsTable).values({
      installationId: parseInt(installationId),
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Failed to connect GitHub app.');
  }

  return NextResponse.redirect(origin);
}
