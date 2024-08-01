import {
  getGithubInstallation,
  getGithubIntegration,
  getGithubRepository,
} from './github';

export async function pushFile(file: {
  encoding: 'utf-8' | 'base64';
  content: string;
  name: string;
  path?: string;
}) {
  const repository = await getGithubRepository();
  const integration = await getGithubIntegration();
  const installation = await getGithubInstallation(integration);
  const branchName = 'main';

  // get the SHA of the main branch
  const {
    data: {
      object: { sha: baseCommitSha },
    },
  } = await installation.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
    ref: `heads/${branchName}`,
    repo: repository.name,
    owner: repository.owner.login,
  });

  // create a new blob
  const {
    data: { sha: blobSha },
  } = await installation.request('POST /repos/{owner}/{repo}/git/blobs', {
    content: file.content,
    encoding: file.encoding,
    owner: repository.owner.login,
    repo: repository.name,
  });

  // create a new tree
  const {
    data: { sha: treeSha },
  } = await installation.request('POST /repos/{owner}/{repo}/git/trees', {
    base_tree: baseCommitSha,
    tree: [
      {
        path: `${file.path ?? ''}${file.name}`,
        mode: '100644',
        type: 'blob',
        sha: blobSha,
      },
    ],
    owner: repository.owner.login,
    repo: repository.name,
  });

  // create a new commit
  const {
    data: { sha: commitSha },
  } = await installation.request('POST /repos/{owner}/{repo}/git/commits', {
    message: '💅 update tokens',
    tree: treeSha,
    parents: [baseCommitSha],
    owner: repository.owner.login,
    repo: repository.name,
  });

  // update the branch with the new commit
  await installation.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
    ref: `heads/${branchName}`,
    sha: commitSha,
    owner: repository.owner.login,
    repo: repository.name,
  });
}
