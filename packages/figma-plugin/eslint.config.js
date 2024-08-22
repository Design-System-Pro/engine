import baseConfig from '@ds-project/eslint/base';
import reactConfig from '@ds-project/eslint/react';
// import figmaPlugin from '@figma/eslint-plugin-figma-plugins';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
    languageOptions: {
      globals: {
        figma: 'readable',
        __html__: 'readable',
      },
    },
    rules: {
      // ...figmaPlugin.configs.recommended.rules,
    },
  },
  ...baseConfig,
  ...reactConfig,
];
