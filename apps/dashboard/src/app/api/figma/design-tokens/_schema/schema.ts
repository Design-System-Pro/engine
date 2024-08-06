import type { DesignToken, DesignTokens } from 'style-dictionary/types';
import { z } from 'zod';

// DesignToken schema
const DesignTokenSchema = z
  .object({
    value: z.any().optional(),
    $value: z.any().optional(),
    type: z.string().optional(),
    $type: z.string().optional(),
    $description: z.string().optional(),
    name: z.string().optional(),
    comment: z.string().optional(),
    themeable: z.boolean().optional(),
    attributes: z.record(z.unknown()).optional(),
    // Allow any additional properties
  })
  .catchall(z.any());

// DesignTokens schema
const DesignTokensSchema: z.ZodType<DesignTokens> = z.lazy(() =>
  z
    .object({
      $type: z.string().optional(),
      // Allow nesting of DesignTokens or DesignToken
    })
    .catchall(
      z.union([
        DesignTokenSchema,
        DesignTokensSchema,
        z.string(),
        z.undefined(),
      ])
    )
);

// PreprocessedTokens schema
const PreprocessedTokensSchema: z.ZodType<DesignToken | DesignTokens> = z.lazy(
  () => z.record(z.union([DesignTokenSchema, PreprocessedTokensSchema]))
);

// TransformedToken schema
const TransformedTokenSchema = DesignTokenSchema.extend({
  name: z.string(),
  path: z.array(z.string()),
  original: DesignTokenSchema,
  filePath: z.string(),
  isSource: z.boolean(),
});

// TransformedTokens schema
const TransformedTokensSchema: z.ZodType<DesignToken | DesignTokens> = z.lazy(
  () => z.record(z.union([TransformedTokenSchema, TransformedTokensSchema]))
);

// Dictionary schema
const DictionarySchema = z.object({
  tokens: TransformedTokensSchema,
  allTokens: z.array(TransformedTokenSchema),
  unfilteredTokens: TransformedTokensSchema.optional(),
  unfilteredAllTokens: z.array(TransformedTokenSchema).optional(),
});

export const RequestSchema = z.object({
  fileId: z.string().uuid(),
  designTokens: DesignTokensSchema,
});

// Export schemas
export {
  DesignTokenSchema,
  DesignTokensSchema,
  PreprocessedTokensSchema,
  TransformedTokenSchema,
  TransformedTokensSchema,
  DictionarySchema,
};
