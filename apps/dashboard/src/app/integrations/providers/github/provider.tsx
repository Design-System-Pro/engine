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
} from '@ds-project/components';
import Link from 'next/link';
import { config } from '@/config';
import { getInstallation } from './installation.action';
import { selectRepository } from './select-repository.action';
import { commitToRepository } from './commit.action';

export async function GithubProvider() {
  await commitToRepository();

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
  // console.log({ installationId: installation?.installationId });

  const repositories = await (async () => {
    if (installation) {
      const octokit = await app.getInstallationOctokit(
        installation.installationId
      );

      const { data } = await octokit.request('GET /installation/repositories');
      return data.repositories;
    }
  })();

  const isInstallationActive = Boolean(installation?.installationId);

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <Icons.GitHubLogoIcon />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">GitHub</p>
        <p className="text-muted-foreground text-sm">Synchronize your tokens</p>
      </div>

      <form action={selectRepository}>
        <Select
          defaultValue={installation?.repositoryId?.toString()}
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
          value={installation?.installationId}
        />

        <Button type="submit">Update</Button>
      </form>

      <Button asChild variant={isInstallationActive ? 'outline' : 'default'}>
        <Link href={installationUrl}>
          {isInstallationActive ? 'Configure' : 'Authorize'}
        </Link>
      </Button>
    </div>
  );
}
