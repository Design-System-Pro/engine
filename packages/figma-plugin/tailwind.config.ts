import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/plugin/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  plugins: [],
};
export default config;
