import { Button, Icons, Text } from '@ds-project/components';
import Link from 'next/link';
import { config } from '@/config';
import { getState } from './state.action';
import { getInstallation } from './installation.action';

export async function FigmaProvider() {
  const state = await getState();
  const installationUrl = `https://www.figma.com/oauth?client_id=${config.figma.appClientId}&redirect_uri=${config.figma.redirectUri}&scope=files:read,file_variables:read,file_variables:write&state=${state}&response_type=code`;

  const installation = await getInstallation();

  const isInstallationActive = Boolean(installation?.data.accessToken);

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <Icons.FigmaLogoIcon height={54} width={54} />
      <div className="flex-1 space-y-1">
        <Text size="base" weight="medium">
          <h2>Figma</h2>
        </Text>
        <Text mood="muted" size="sm">
          <p>Synchronize your variables</p>
        </Text>
      </div>

      <Button asChild variant={isInstallationActive ? 'outline' : 'default'}>
        <Link href={installationUrl}>
          {isInstallationActive ? 'Configure' : 'Authorize'}
        </Link>
      </Button>

      <Button>
        <Link href="/integrations/providers/figma">Tokens</Link>
      </Button>
    </div>
  );
}
