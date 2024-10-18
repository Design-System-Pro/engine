import type { JSONTokenTree } from 'design-tokens-format-module';

export const tokenizeVariable =
  (variableName: string) => (token: JSONTokenTree) => {
    const paths = [...variableName.split('/')];

    return paths.reduceRight((accumulator, path) => {
      return {
        [path.toLowerCase()]: accumulator,
      };
    }, token);
  };
