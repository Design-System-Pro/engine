const { resolve } = require("node:path");

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
  ].map(
    require.resolve
  ),
  parserOptions: {
    project,
  },
  ignorePatterns: ['node_modules/', 'dist/', "vite.config.ts"],
  globals: { React: true, JSX: true },
  plugins: ["unused-imports", "tailwindcss"],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
    tailwindcss: {
      callees: ["cn", "clsx", "cva"],
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  }
};
