import { z } from 'zod';

export const figmaUrlRegex =
  /^https:\/\/www\.figma\.com\/design\/(?<fileKey>[A-Za-z0-9]+)\/[A-Za-z0-9-]+/;
export const dataSchema = z.object({
  figmaFileUrl: z.string().regex(figmaUrlRegex, 'Invalid Figma URL'),
});

export type DataSchema = z.infer<typeof dataSchema>;
