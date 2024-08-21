'use server';
import type { DesignTokens } from 'style-dictionary/types';
import type { Octokit } from '@octokit/core';

import { config } from '@/config';
import { api } from '@ds-project/api/rsc';
import { getInstallationOctokit } from '@ds-project/services/github';

async function searchFileSha({
  octokit,
  owner,
  path,
  repo,
  treeSha,
  index = 0,
}: {
  octokit: Octokit;
  owner: string;
  repo: string;
  treeSha: string;
  path: string[];
  index?: number;
}) {
  const { data: treeData } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
    {
      owner,
      repo,
      tree_sha: treeSha,
    }
  );

  const treeOrFile = treeData.tree.find(
    (treeItem) => treeItem.path === path[index]
  );
  if (!treeOrFile?.sha) {
    return null;
  }
  if (index === path.length - 1) {
    return treeOrFile.sha;
  }

  return searchFileSha({
    octokit,
    owner,
    repo,
    treeSha: treeOrFile.sha,
    path,
    index: index + 1,
  });
}

export async function fetchReleaseTokens(releaseId: number) {
  const githubIntegration = await api.integrations.github();

  if (!githubIntegration) {
    throw new Error('GitHub installation not found');
  }

  const octokit = await getInstallationOctokit(
    githubIntegration.data.installationId
  );

  const repositories = await octokit.request('GET /installation/repositories');

  const repository = repositories.data.repositories.find(
    (_repository) => _repository.id === githubIntegration.data.repositoryId
  );

  if (!repository) throw new Error('No repository found');

  const { data: release } = await octokit.request(
    'GET /repos/{owner}/{repo}/releases/{release_id}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      release_id: releaseId,
    }
  );

  const { data: tagName } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/ref/{ref}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      ref: `tags/${release.tag_name}`,
    }
  );

  // First, get the file sha from the commit
  const { data: tagSha } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/tags/{tag_sha}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      tag_sha: tagName.object.sha,
    }
  );

  const { data: commitSha } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/commits/{commit_sha}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      commit_sha: tagSha.object.sha,
    }
  );

  const tokensPath = [...config.gitTokensPath.split('/'), 'tokens.json'];
  const fileSha = await searchFileSha({
    octokit,
    owner: repository.owner.login,
    treeSha: commitSha.tree.sha,
    repo: repository.name,
    path: tokensPath,
  });

  if (!fileSha) {
    throw new Error('File not found');
  }

  const { data: file } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      file_sha: fileSha,
    }
  );

  const tokens = Buffer.from(
    file.content,
    file.encoding as BufferEncoding
  ).toString();

  return JSON.parse(tokens) as DesignTokens;
}
