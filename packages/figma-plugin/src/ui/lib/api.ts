import type { DesignTokens } from 'style-dictionary/types';
import { config } from '../config';

const baseApiUrl = config.AUTH_API_HOST;

const fetchApi = (url: string, options: RequestInit) =>
  fetch(`${baseApiUrl}${url}`, options);

interface GetNewKeysResponse {
  writeKey: string;
  readKey: string;
}

interface GetAccessTokenResponse {
  accessToken: string;
}

const headers = new Headers();

export const api = {
  setAuthorizationToken: (accessToken: string) => {
    headers.set('Authorization', `Bearer ${accessToken}`);
  },

  getNewKeys: async (): Promise<GetNewKeysResponse> => {
    const response = await fetchApi('/api/figma/init', {
      headers,
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as GetNewKeysResponse;

    return data;
  },
  getAccessToken: async (readKey: string): Promise<GetAccessTokenResponse> => {
    const response = await fetchApi('/api/figma/read', {
      headers,
      method: 'POST',
      body: JSON.stringify({ readKey }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as GetAccessTokenResponse;

    return data;
  },
  setStyleDictionary: async (styleDictionary: DesignTokens): Promise<true> => {
    const response = await fetchApi('/api/style-dictionary/set', {
      headers,
      method: 'POST',
      body: JSON.stringify({ styleDictionary }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return true;
  },
};
