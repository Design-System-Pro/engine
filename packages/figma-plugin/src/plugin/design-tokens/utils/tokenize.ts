import type { DesignToken } from 'style-dictionary/types';

export const tokenize =
  (modeId: string, name: string) => (token: DesignToken) => {
    const paths = [modeId, ...name.split('/')];

    return paths.reduceRight((accumulator, path) => {
      return {
        [path]: accumulator,
      };
    }, token);
  };
