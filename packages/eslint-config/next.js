const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo',
  ].map(require.resolve),
  plugins: ['unused-imports', 'tailwindcss'],
  parserOptions: { project },
  globals: { React: true, JSX: true, BufferEncoding: 'readonly' },
  settings: {
    'import/resolver': {
      typescript: { project },
      node: { extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'] },
    },
    tailwindcss: {
      callees: ['cn', 'clsx', 'cva'],
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
  rules: {
    'import/no-default-export': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
    'react/jsx-boolean-value': 'error',

    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-negative-arbitrary-values': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/migration-from-tailwind-2': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-unnecessary-arbitrary-value': 'warn',

    'arrow-body-style': 'error',
    'prefer-arrow-callback': 'error',
    'react/function-component-definition': 'off',

    'jsx-a11y/heading-has-content': [2, { components: ['CardTitle'] }],
  },
};
