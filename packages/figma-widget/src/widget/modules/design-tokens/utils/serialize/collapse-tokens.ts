import type { Group, TokenNormalized } from '@terrazzo/token-tools';
import { parse } from '@terrazzo/parser';

/**
 * Collapse the group structure into normalized tokens.
 * @param tokens
 * @returns
 */
export async function collapseTokens(
  tokens: Group
): Promise<Record<string, TokenNormalized>> {
  const { tokens: normalizedTokens } = await parse([{ src: tokens }]);
  return normalizedTokens;
}
