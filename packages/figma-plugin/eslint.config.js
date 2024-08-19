import baseConfig from '@ds-project/eslint/base';
import reactConfig from '@ds-project/eslint/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
    extends: ['plugin:@figma/figma-plugins/recommended'],
    globals: {
      figma: 'readable',
      __html__: 'readable',
    },
  },
  ...baseConfig,
  ...reactConfig,
];
