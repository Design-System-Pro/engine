import {
  Button,
  FormItem,
  Icons,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from '@ds-project/components';
import Link from 'next/link';
import { selectRepository } from '../_actions';
import {
  getGithubApp,
  getInstallationOctokit,
} from '@ds-project/services/github';
import { api } from '@ds-project/api/rsc';

export async function GithubProvider() {
  const githubApp = getGithubApp();

  const installationUrl = await githubApp.getInstallationUrl();

  const githubIntegration = await api.integrations.github();

  const repositories = await (async () => {
    if (githubIntegration) {
      const octokit = await getInstallationOctokit(
        githubIntegration.data.installationId
      );
      const { data } = await octokit.request('GET /installation/repositories');
      return data.repositories;
    }
  })();

  const isInstallationActive = Boolean(githubIntegration?.data.installationId);

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

      {githubIntegration ? (
        <form action={selectRepository} className="flex gap-2 items-end">
          <FormItem>
            <Label>Repository</Label>
            <Select
              defaultValue={githubIntegration.data.repositoryId?.toString()}
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
          </FormItem>
          <Input
            name="installationId"
            type="hidden"
            value={githubIntegration.data.installationId}
          />

          <Button type="submit">Update</Button>
        </form>
      ) : null}

      <Button
        asChild
        variant={isInstallationActive ? 'outline' : 'default'}
        className="self-end"
      >
        <Link href={installationUrl}>
          {isInstallationActive ? 'Configure' : 'Authorize'}
        </Link>
      </Button>
    </div>
  );
}
