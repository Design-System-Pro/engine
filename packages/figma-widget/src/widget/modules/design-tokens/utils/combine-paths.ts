import type { Group } from '@terrazzo/token-tools';
import { mergeDeepRight, reduce } from 'rambda';

export const combinePaths = (tokens: Group[]) => {
  return reduce<Group, Group>(
    (accumulator, variable) => mergeDeepRight(accumulator, variable),
    {}
  )(tokens);
};
