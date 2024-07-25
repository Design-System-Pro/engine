'use server';

import { App } from '@octokit/app';
import { config } from '@/config';
import { getInstallation } from './installation.action';

export async function commitToRepository() {
  const app = new App({
    appId: config.github.appId,
    privateKey: config.github.appPrivateKey,
    oauth: {
      clientId: config.github.appClientId,
      clientSecret: config.github.appClientSecret,
    },
  });

  const installation = await getInstallation();

  if (!installation) {
    return null;
  }

  const octokit = await app.getInstallationOctokit(installation.installationId);

  const {
    data: { repositories },
  } = await octokit.request('GET /installation/repositories');
  const repo = repositories.find(
    (repository) => repository.id === installation.repositoryId
  );

  if (!repo) {
    return null;
  }

  try {
    const { data: refData } = await octokit.request(
      'GET /repos/{owner}/{repo}/git/ref/{ref}',
      {
        ref: 'heads/main',
        repo: repo.name,
        owner: repo.owner.login,
      }
    );

    const baseTreeSha = refData.object.sha;

    const { data: blobData } = await octokit.request(
      'POST /repos/{owner}/{repo}/git/blobs',
      {
        content:
          'ewogICIkdHlwZSI6ICJjb2xvciIsCiAgImNvbG9yIjogewogICAgImJhY2tncm91bmQiOiB7CiAgICAgICJwcmltYXJ5IjogewogICAgICAgICIkdmFsdWUiOiAiIzAwMDAwMCIKICAgICAgfSwKICAgICAgInNlY29uZGFyeSI6IHsKICAgICAgICAiJHZhbHVlIjogIiM5YTQwNDAiCiAgICAgIH0KICAgIH0KICB9LAogICJidXR0b24iOiB7CiAgICAiYWN0aXZlIjogewogICAgICAiYmFja2dyb3VuZCI6IHsKICAgICAgICAiJHZhbHVlIjogIiIKICAgICAgfQogICAgfQogIH0KfQo=',
        encoding: 'base64',
        owner: repo.owner.login,
        repo: repo.name,
      }
    );

    const { data: treeData } = await octokit.request(
      'POST /repos/{owner}/{repo}/git/trees',
      {
        base_tree: baseTreeSha,
        tree: [
          {
            path: 'colors.json',
            mode: '100644',
            type: 'blob',
            sha: blobData.sha,
          },
        ],
        owner: repo.owner.login,
        repo: repo.name,
      }
    );

    const { data: commitData } = await octokit.request(
      'POST /repos/{owner}/{repo}/git/commits',
      {
        message: 'Update colors',
        tree: treeData.sha,
        parents: [baseTreeSha],
        owner: repo.owner.login,
        repo: repo.name,
      }
    );

    await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
      ref: `refs/heads/${repo.name}`,
      sha: commitData.sha,
      owner: repo.owner.login,
      repo: repo.name,
    });

    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.log('Successfully created commit');
  } catch (error) {
    // eslint-disable-next-line no-console -- TODO: replace with monitoring
    console.error('Error creating commit', error);
  }
}
