import baseConfig from '@ds-project/eslint/base';
import reactConfig from '@ds-project/eslint/react';

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  {
    ignores: ['dist/**'],
    languageOptions: {
      globals: {
        figma: 'readable',
        __html__: 'readable',
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
];
