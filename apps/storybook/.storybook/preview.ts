import '@ds-project/components/globals.css';
import './preview.css';
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';

import light from '@ds-project/components/light-theme.css?inline';
import dark from '@ds-project/components/dark-theme.css?inline';

import type { Decorator, Preview } from '@storybook/react';

// Vite hack for storybook
// https://github.com/etchteam/storybook-addon-css-variables-theme/issues/20#issuecomment-1555243720
const makeCssFiles = (themes: Record<string, string>) => {
  const styleTag = document.createElement('style');
  document.body.appendChild(styleTag);

  const use = (name: string) => () => {
    const { [name]: styles } = themes;
    styleTag.innerHTML = styles;
  };

  return Object.fromEntries(
    Object.keys(themes).map((name) => {
      return [name, { use: use(name), unuse: () => null }];
    })
  );
};

export const decorators: Decorator[] = [cssVariablesTheme];

const preview: Preview = {
  parameters: {
    cssVariables: {
      defaultTheme: 'Light',
      files: makeCssFiles({
        Light: light,
        Dark: dark,
      }),
    },
  },
};

export default preview;
