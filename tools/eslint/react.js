import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tailwindPlugin from 'eslint-plugin-tailwindcss';

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        React: 'writable',
      },
    },
  },
  ...tailwindPlugin.configs['flat/recommended'],
];
