import type { DesignToken } from 'style-dictionary/types';

export const tokenizeVariable =
  (variableName: string) => (token: DesignToken) => {
    const paths = [...variableName.split('/')];

    return paths.reduceRight((accumulator, path) => {
      return {
        [path.toLowerCase()]: accumulator,
      };
    }, token);
  };
