/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/react.js"],
  plugins: ["unused-imports", "tailwindcss"],
  settings: {
    tailwindcss: {
      callees: ["cn", "clsx", "cva"],
    },
  },
};
