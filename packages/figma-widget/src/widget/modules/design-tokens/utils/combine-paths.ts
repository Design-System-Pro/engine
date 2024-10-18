import type { JSONTokenTree } from 'design-tokens-format-module';
import { mergeDeepRight, reduce } from 'rambda';

export const combinePaths = (tokens: NonNullable<JSONTokenTree>[]) => {
  return reduce<NonNullable<JSONTokenTree>, JSONTokenTree>(
    (accumulator, variable) => mergeDeepRight(accumulator, variable),
    {}
  )(tokens);
};
