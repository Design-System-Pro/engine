import 'server-only';

import crypto from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { kv } from '@vercel/kv';
import { config } from '@/config';
import type { KVOAuthState } from '@/types/kv-types';

import type { SelectFigmaIntegration } from '@ds-project/database/schema';
import {
  figmaIntegrationSchema,
  Integrations,
  InsertIntegrationsSchema,
  integrationType,
} from '@ds-project/database/schema';
import { database } from '@ds-project/database/client';
import { api } from '../trpc/server';
import { cache } from 'react';

class Figma {
  private apiUrl = 'https://api.figma.com';
  private url = 'https://www.figma.com';
  private accessToken: string | undefined;
  private retryCount = 0;
  private state: 'not-integrated' | 'ready' | 'invalid' | undefined;

  constructor(private projectId: string) {}

  public async init() {
    await this.updateIntegration();
    this.state = 'ready';
  }

  /**
   * Exchanges the code for the credentials. Credentials are immediately stored in the database.
   * @param code - The code to exchange
   */
  public async exchangeCode({ code, state }: { code: string; state: string }) {
    const validState = await kv.getdel<KVOAuthState>(state);

    if (validState?.state !== state) {
      throw new Error('Invalid state');
    }

    const result = await fetch(`${this.url}/api/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${encodeURIComponent(config.figma.appClientId)}&client_secret=${encodeURIComponent(config.figma.appClientSecret)}&redirect_uri=${encodeURIComponent(config.figma.redirectUri)}&code=${encodeURIComponent(code)}&grant_type=authorization_code`,
    });

    if (!result.ok) {
      throw new Error('Error exchanging code');
    }

    const validatedValues = InsertIntegrationsSchema.parse({
      type: integrationType.Enum.figma,
      projectId: this.projectId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- We are making sure it gets validated by the schema, so there should not be any risk in theory
      data: {
        type: integrationType.Enum.figma,
        ...(await result.json()),
      },
    });

    await database
      .insert(Integrations)
      .values(validatedValues)
      .onConflictDoUpdate({
        target: [Integrations.type, Integrations.projectId],
        set: {
          data: validatedValues.data,
        },
      });
  }

  /**
   * Refreshes the integration access token
   * @param integration - The figma integration entity
   * @returns
   */
  private async refreshIntegration(integration: SelectFigmaIntegration) {
    const result = await fetch(`${this.url}/api/oauth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${encodeURIComponent(config.figma.appClientId)}&client_secret=${encodeURIComponent(config.figma.appClientSecret)}&redirect_uri=${encodeURIComponent(config.figma.redirectUri)}&refresh_token=${encodeURIComponent(integration.data.refreshToken)}`,
    });

    if (!result.ok) {
      this.state = 'invalid';
      throw new Error('Error refreshing token');
    }

    const data = (await result.json()) as {
      access_token: string;
      expires_in: number;
    };

    const figmaIntegrationData = figmaIntegrationSchema.parse({
      ...integration.data,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    });

    const [updatedIntegration] = (await database
      .update(Integrations)
      .set({
        data: figmaIntegrationData,
      })
      .where(eq(Integrations.id, integration.id))
      .returning()) as SelectFigmaIntegration[];

    this.accessToken = updatedIntegration.data.accessToken;

    return updatedIntegration;
  }

  /**
   * Returns the database figma integration for the design system
   * @returns
   */
  private async getIntegration() {
    return (await database.query.Integrations.findFirst({
      where: (integrations) =>
        and(
          eq(integrations.type, integrationType.Enum.figma),
          eq(integrations.projectId, this.projectId)
        ),
    })) as SelectFigmaIntegration | undefined;
  }

  /**
   * Updates the integration access token if it is expired
   * @returns
   */
  private async updateIntegration() {
    const integration = await this.getIntegration();

    if (!integration) {
      this.state = 'not-integrated';
      return;
    }

    if (this.isIntegrationExpired(integration)) {
      await this.refreshIntegration(integration);

      return;
    }

    this.accessToken = integration.data.accessToken;
  }

  private isIntegrationExpired({
    updatedAt,
    data: { expiresIn },
  }: SelectFigmaIntegration) {
    return (
      new Date(updatedAt).getTime() + expiresIn * 1000 < new Date().getTime()
    );
  }

  private async apiFetch(
    path: string,
    init?: RequestInit
  ): ReturnType<typeof fetch> {
    const response = await fetch(`${this.apiUrl}${path}`, {
      headers: {
        ...(this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {}),
        ...init?.headers,
      },
      ...init,
    });

    if (
      response.status === 403 &&
      this.state === 'ready' &&
      this.retryCount === 0
    ) {
      // The token is invalid or expired, so we need to refresh it, but only if we haven't retried yet and the state of the integration is 'ready'
      const integration = await this.getIntegration();
      if (integration) {
        await this.refreshIntegration(integration);

        // Try the request again
        this.retryCount += 1;
        return this.apiFetch(path, init);
      }
    } else {
      this.retryCount = 0;
    }

    return response;
  }

  /**
   * Gets the figma file properties
   * @param fileKey - Figma identifier in Figma file url eg. https://www.figma.com/design/<fileKey>/Project-DS
   * @returns
   */
  public async getFile(fileKey: string) {
    const result = await this.apiFetch(`/v1/files/${fileKey}`, {
      method: 'GET',
    });

    if (!result.ok)
      throw new Error(`Error fetching file: ${result.statusText}`);

    const fileResponse = (await result.json()) as {
      thumbnailUrl: string;
      name: string;
      lastModified: string;
    };

    return fileResponse;
  }

  /**
   * Returns installation URL for the figma app. The user should be redirected to this URL to get the authorization code
   * @returns
   */
  public async getInstallationUrl() {
    const state = crypto.randomBytes(64).toString('hex');

    if (
      await kv.set<KVOAuthState>(
        state,
        { state },
        {
          /**
           * TODO: perhaps increase this expire time for longer
           * since this link might not be requested by the user, but solely by the page
           * which poses a risk of the user clicking in the url after it got expired, resulting in a failed auth
           */
          px: 5 * 60 * 1000, // Set the 5 minutes expire time, in milliseconds (a positive integer).
          nx: true, // Only set the key if it does not already exist.
        }
      )
    ) {
      return `${this.url}/oauth?client_id=${config.figma.appClientId}&redirect_uri=${config.figma.redirectUri}&scope=files:read,file_variables:read,file_variables:write&state=${state}&response_type=code`;
    }

    return null;
  }
}

async function generateFigma(projectId: string) {
  const figma = new Figma(projectId);
  await figma.init();
  return figma;
}

const memoizedFigma = cache(generateFigma);

export async function getFigma() {
  const project = await api.projects.current();

  if (!project?.id) {
    throw new Error('No project associated with this account');
  }

  return memoizedFigma(project.id);
}
