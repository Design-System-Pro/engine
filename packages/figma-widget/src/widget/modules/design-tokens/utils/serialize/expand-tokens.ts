import { Group, TokenNormalized } from '@terrazzo/token-tools';

/**
 * Expand the normalized tokens into a group structure.
 * @param collapsedTokens
 * @returns
 */
export function expandTokens(
  collapsedTokens: Record<string, TokenNormalized>
): Group {
  const tokens: Group = {};

  for (const key in collapsedTokens) {
    const token = collapsedTokens[key];
    const path = key.split('.');

    let group = tokens;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];

      if (!(key in group)) {
        // initialize group
        group[key] = {};
      }
      // move to the next group
      group = group[key];
    }

    // add token to the last group
    group[path[path.length - 1]] = token;
  }

  return tokens;
}
