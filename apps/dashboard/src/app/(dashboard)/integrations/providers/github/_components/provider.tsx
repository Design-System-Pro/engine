import { App } from '@octokit/app';
import {
  Button,
  Icons,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from '@ds-project/components';
import Link from 'next/link';
import { config } from '@/config';
import { getInstallation, selectRepository } from '../_actions';

export async function GithubProvider() {
  const app = new App({
    appId: config.github.appId,
    privateKey: config.github.appPrivateKey,
    oauth: {
      clientId: config.github.appClientId,
      clientSecret: config.github.appClientSecret,
    },
  });

  const installationUrl = await app.getInstallationUrl();

  const installation = await getInstallation();

  const repositories = await (async () => {
    if (installation) {
      const octokit = await app.getInstallationOctokit(
        installation.data.installationId
      );

      const { data } = await octokit.request('GET /installation/repositories');
      return data.repositories;
    }
  })();

  const isInstallationActive = Boolean(installation?.data.installationId);

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <Icons.GitHubLogoIcon height={54} width={54} />
      <div className="flex-1 space-y-1">
        <Text size="base" weight="medium">
          <h2>GitHub</h2>
        </Text>
        <Text mood="muted" size="sm">
          <p>Synchronize your tokens</p>
        </Text>
      </div>

      {installation ? (
        <form action={selectRepository} className="flex gap-2">
          <Select
            defaultValue={installation.data.repositoryId?.toString()}
            name="repositoryId"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Repositories" />
            </SelectTrigger>
            <SelectContent>
              {repositories?.map((repository) => (
                <SelectItem key={repository.id} value={String(repository.id)}>
                  {repository.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="installationId"
            type="hidden"
            value={installation.data.installationId}
          />

          <Button type="submit">Update</Button>
        </form>
      ) : null}

      <Button asChild variant={isInstallationActive ? 'outline' : 'default'}>
        <Link href={installationUrl}>
          {isInstallationActive ? 'Configure' : 'Authorize'}
        </Link>
      </Button>

      {/* <Button>
        <Link href="/integrations/providers/github">Tokens</Link>
      </Button> */}
    </div>
  );
}
