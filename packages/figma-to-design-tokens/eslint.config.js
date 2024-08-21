import baseConfig from '@ds-project/eslint/base';
import reactConfig from '@ds-project/eslint/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
];
