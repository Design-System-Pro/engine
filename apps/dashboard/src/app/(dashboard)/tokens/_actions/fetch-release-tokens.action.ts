'use server';
import type { DesignTokens } from 'style-dictionary/types';
import type { Octokit } from '@octokit/core';
import {
  getGithubInstallation,
  getGithubIntegration,
  getGithubRepository,
} from '@/lib/github';
import { isAuthenticated } from '@/lib/supabase/server/utils/is-authenticated';
import { config } from '@/config';

async function searchFileSha({
  installation,
  owner,
  path,
  repo,
  treeSha,
  index = 0,
}: {
  installation: Octokit;
  owner: string;
  repo: string;
  treeSha: string;
  path: string[];
  index?: number;
}) {
  const { data: treeData } = await installation.request(
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
    installation,
    owner,
    repo,
    treeSha: treeOrFile.sha,
    path,
    index: index + 1,
  });
}

export async function fetchReleaseTokens(releaseId: number) {
  if (!(await isAuthenticated())) {
    throw new Error('Not authenticated');
  }

  const repository = await getGithubRepository();
  const integration = await getGithubIntegration();
  const installation = await getGithubInstallation(integration);

  const { data: release } = await installation.request(
    'GET /repos/{owner}/{repo}/releases/{release_id}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      release_id: releaseId,
    }
  );

  const { data: tagName } = await installation.request(
    'GET /repos/{owner}/{repo}/git/ref/{ref}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      ref: `tags/${release.tag_name}`,
    }
  );

  // First, get the file sha from the commit
  const { data: tagSha } = await installation.request(
    'GET /repos/{owner}/{repo}/git/tags/{tag_sha}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      tag_sha: tagName.object.sha,
    }
  );

  const { data: commitSha } = await installation.request(
    'GET /repos/{owner}/{repo}/git/commits/{commit_sha}',
    {
      owner: repository.owner.login,
      repo: repository.name,
      commit_sha: tagSha.object.sha,
    }
  );

  const tokensPath = [...config.gitTokensPath.split('/'), 'tokens.json'];
  const fileSha = await searchFileSha({
    installation,
    owner: repository.owner.login,
    treeSha: commitSha.tree.sha,
    repo: repository.name,
    path: tokensPath,
  });

  if (!fileSha) {
    throw new Error('File not found');
  }

  const { data: file } = await installation.request(
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
