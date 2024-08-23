import z from 'zod';

export interface Credentials {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const CredentialsSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number(),
});
