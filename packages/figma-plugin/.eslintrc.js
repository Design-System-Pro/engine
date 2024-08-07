module.exports = {
  extends: [
    '@repo/eslint-config/react.js',
    'plugin:@figma/figma-plugins/recommended',
  ],
  globals: {
    figma: 'readable',
    __html__: 'readable',
  },
};
