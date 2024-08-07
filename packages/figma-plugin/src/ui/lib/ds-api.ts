import type { DesignTokens } from 'style-dictionary/types';
import { config } from '../config';
import type { Credentials } from '../../types/credentials';

interface GetNewKeysResponse {
  writeKey: string;
  readKey: string;
}

export class DSApi {
  private apiUrl = config.AUTH_API_HOST;
  private credentials: Credentials | undefined;
  private retryCount = 0;
  public state: 'ready' | 'invalid' | undefined;

  constructor(
    private announceNewCredentials: (credentials: Credentials) => void = () =>
      undefined
  ) {}

  public init(credentials: Credentials) {
    this.credentials = { ...credentials };
    this.state = 'ready';
  }

  private async apiFetch(
    path: string,
    init?: RequestInit
  ): ReturnType<typeof fetch> {
    const response = await fetch(`${this.apiUrl}${path}`, {
      headers: {
        ...(this.credentials?.accessToken
          ? { Authorization: `Bearer ${this.credentials.accessToken}` }
          : {}),
        ...init?.headers,
      },
      ...init,
    });

    if (
      response.status === 401 &&
      this.state === 'ready' &&
      this.retryCount === 0
    ) {
      // The token is invalid or expired, so we need to refresh it, but only if we haven't retried yet and the state of the api is 'ready'
      await this.refreshCredentials();

      // Try the request again
      this.retryCount += 1;
      return this.apiFetch(path, init);
    }
    this.retryCount = 0;

    return response;
  }

  private async refreshCredentials() {
    const response = await this.apiFetch('/api/figma/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: this.credentials?.refreshToken }),
    });

    if (!response.ok) {
      this.state = 'invalid';
      throw new Error('Error refreshing token');
    }

    this.credentials = (await response.json()) as Credentials;
    this.announceNewCredentials(this.credentials);
  }

  public async getNewKeys() {
    const response = await this.apiFetch('/api/figma/init', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as GetNewKeysResponse;

    return data;
  }

  public async exchangeCredentials(readKey: string) {
    const response = await this.apiFetch('/api/figma/read', {
      method: 'POST',
      body: JSON.stringify({ readKey }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    this.credentials = (await response.json()) as Credentials;
    this.announceNewCredentials(this.credentials);
  }

  public async getDesignSystems() {
    const result = await this.apiFetch('/api/figma/design-systems/list', {
      method: 'GET',
    });

    if (!result.ok) throw new Error('Error fetching design systems');

    return (await result.json()) as {
      designSystems: { id: string; name: string }[];
    };
  }

  public async updateDesignTokens({
    designTokens,
    fileId,
  }: {
    fileId: string;
    designTokens: DesignTokens;
  }) {
    const response = await this.apiFetch('/api/figma/design-tokens', {
      method: 'POST',
      body: JSON.stringify({ fileId, designTokens }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  public logout() {
    this.credentials = undefined;
    this.state = 'invalid';
  }

  public async linkDesignSystem({
    designSystemId,
    fileName,
  }: {
    designSystemId: string;
    fileName: string;
  }) {
    const response = await this.apiFetch('/api/figma/design-systems/link', {
      method: 'POST',
      body: JSON.stringify({ designSystemId, fileName }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
}
