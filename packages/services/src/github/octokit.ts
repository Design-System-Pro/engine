/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { App } from '@octokit/app';

let githubApp: App | undefined = undefined;

export const getGithubApp = ({
  appId = process.env.GITHUB_APP_ID!,
  privateKey = Buffer.from(
    process.env.GITHUB_APP_PRIVATE_KEY!,
    'base64'
  ).toString('ascii'),
  clientId = process.env.GITHUB_APP_CLIENT_ID!,
  clientSecret = process.env.GITHUB_APP_CLIENT_SECRET!,
}: {
  appId?: string;
  privateKey?: string;
  clientId?: string;
  clientSecret?: string;
} = {}): App => {
  return (githubApp ??= new App({
    appId,
    privateKey,
    oauth: {
      clientId,
      clientSecret,
    },
  }));
};

export const getInstallationOctokit = async (installationId: number) => {
  const app = getGithubApp();
  return app.getInstallationOctokit(installationId);
};
