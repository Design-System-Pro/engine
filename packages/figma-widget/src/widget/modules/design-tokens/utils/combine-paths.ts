import { mergeDeepRight, reduce } from 'rambda';
import type { DesignTokens } from 'style-dictionary/types';

export const combinePaths = (tokens: DesignTokens[]) => {
  return reduce<DesignTokens, DesignTokens>(
    (accumulator, variable) => mergeDeepRight(accumulator, variable),
    {}
  )(tokens);
};
