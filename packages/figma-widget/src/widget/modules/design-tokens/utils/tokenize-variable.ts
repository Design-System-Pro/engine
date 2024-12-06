import type { Group, GroupOrToken, Token } from '@terrazzo/token-tools';

export const tokenizeVariable =
  (variableName: string) =>
  (token: Token): Group => {
    const paths = [...variableName.split('/')];

    return paths.reduceRight<GroupOrToken>((accumulator, path) => {
      return {
        [path]: accumulator,
      };
    }, token);
  };
