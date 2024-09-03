import path from 'node:path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import preserveDirectives from 'rollup-preserve-directives';

export default defineConfig(({ mode }) => ({
  plugins: [viteSingleFile()],
  build: {
    minify: mode === 'production',
    sourcemap: mode !== 'production' ? 'inline' : false,
    target: 'es2017',
    emptyOutDir: false,
    outDir: path.resolve('dist'),
    rollupOptions: {
      plugins: [preserveDirectives],
      input: path.resolve('widget-src/main.tsx'),
      output: {
        entryFileNames: 'widget.js',
      },
    },
  },
}));
