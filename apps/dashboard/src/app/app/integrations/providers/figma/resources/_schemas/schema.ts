import { z } from 'zod';

export const figmaUrlRegex =
  /^https:\/\/www\.figma\.com\/design\/(?<fileKey>[A-Za-z0-9]+)\/[A-Za-z0-9-]+/;
export const figmaFileSchema = z.object({
  tokenId: z.string().uuid(),
  name: z.string(),
  thumbnailUrl: z.string().url(),
  url: z.string().regex(figmaUrlRegex, 'Invalid Figma URL'),
  lastModified: z.string().datetime(),
});

export type DataSchema = z.infer<typeof figmaFileSchema>;
