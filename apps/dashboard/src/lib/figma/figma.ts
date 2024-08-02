import { config } from '@/config';

const figmaUrl = 'https://www.figma.com';

export const figma = {
  getInstallationUrl: (state?: string | null) =>
    `${figmaUrl}/oauth?client_id=${config.figma.appClientId}&redirect_uri=${config.figma.redirectUri}&scope=files:read,file_variables:read,file_variables:write&state=${state}&response_type=code`,
  exchangeCode: async (code: string) => {
    const result = await fetch(`${figmaUrl}/api/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${encodeURIComponent(config.figma.appClientId)}&client_secret=${encodeURIComponent(config.figma.appClientSecret)}&redirect_uri=${encodeURIComponent(config.figma.redirectUri)}&code=${encodeURIComponent(code)}&grant_type=authorization_code`,
    });

    if (!result.ok) {
      throw new Error('Error exchanging code');
    }

    const figmaOAuthResponse = (await result.json()) as {
      user_id: string;
      access_token: string;
      expires_in: string;
      refresh_token: string;
    };

    return {
      accessToken: figmaOAuthResponse.access_token,
      refreshToken: figmaOAuthResponse.refresh_token,
      userId: figmaOAuthResponse.user_id,
      expiresIn: figmaOAuthResponse.expires_in,
    };
  },
};
