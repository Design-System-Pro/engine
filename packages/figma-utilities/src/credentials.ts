import z from 'zod';

export interface Credentials {
  apiKey: string;
}

export const CredentialsSchema = z.object({
  apiKey: z.string().min(1),
});
