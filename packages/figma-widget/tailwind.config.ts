import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/ui/**/*.{ts,tsx}', './src/ui/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
