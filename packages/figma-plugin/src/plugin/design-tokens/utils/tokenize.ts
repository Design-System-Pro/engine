import { DesignToken } from 'style-dictionary/types';

export const tokenize = (name: string) => (token: DesignToken) => {
  const paths = name.split('/');

  return paths.reduceRight((accumulator, path) => {
    return {
      [path]: accumulator,
    };
  }, token);
};
