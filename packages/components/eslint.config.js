import baseConfig, { restrictEnvAccess } from '@ds-project/eslint/base';
import reactConfig from '@ds-project/eslint/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...restrictEnvAccess,
];
