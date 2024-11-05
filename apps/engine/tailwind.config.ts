import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';

const config: Config = {
  corePlugins: {
    preflight: false, // Usage of packages/components includes preflight already
  },
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typographyPlugin],
};
export default config;
