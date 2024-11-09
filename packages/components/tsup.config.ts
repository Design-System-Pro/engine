import { defineConfig } from 'tsup';
import { name } from './package.json';

export default defineConfig((options) => ({
  name,
  entryPoints: ['src/index.ts', 'src/client/index.ts', 'src/server/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  external: ['react', 'react-dom', 'react-hook-form'],
  metafile: true,
  ...options,
}));
