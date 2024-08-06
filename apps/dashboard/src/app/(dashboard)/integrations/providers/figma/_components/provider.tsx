import { Button, Icons, Text } from '@ds-project/components';
import Link from 'next/link';
import { getFigma } from '@/lib/figma';
import { getInstallation } from '../_actions';

export async function FigmaProvider() {
  const figma = await getFigma();
  const installationUrl = await figma.getInstallationUrl();

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
        <Link href="/integrations/providers/figma/files">Files</Link>
      </Button>
    </div>
  );
}
