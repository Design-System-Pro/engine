import baseConfig, { restrictEnvAccess } from '@ds-project/eslint/base';
import nextjsConfig from '@ds-project/eslint/nextjs';
import reactConfig from '@ds-project/eslint/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
