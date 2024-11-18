import { defineConfig } from 'vite';
import livePreview from 'vite-live-preview';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import preserveDirectives from 'rollup-preserve-directives';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    livePreview({
      reload: true,
    }),
    react(),
    // viteSingleFile(),
  ],
  assetsInclude: ['**/*.md'],
  build: {
    minify: mode === 'production',
    sourcemap: mode !== 'production' ? 'inline' : false,
    emptyOutDir: true,
    cssCodeSplit: false,
    outDir: path.resolve('dist'),
    rollupOptions: {
      plugins: [preserveDirectives],
      input: {
        plugin: path.resolve('src/plugin/plugin.ts'),
        index: path.resolve('index.html'),
      },
    },
  },
  preview: {
    port: 4400,
  },
}));
