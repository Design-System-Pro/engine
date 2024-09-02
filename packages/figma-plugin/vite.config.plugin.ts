import path from 'node:path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import react from '@vitejs/plugin-react';
import preserveDirectives from 'rollup-preserve-directives';

const figmaWidgetReactPlugin = react({
  babel: {
    plugins: [
      // Custom JSX factory for Figma widgets
      [
        '@babel/plugin-transform-react-jsx',
        { pragma: 'figma.widget.h', pragmaFrag: 'figma.widget.Fragment' },
      ],
    ],
  },
});

export default defineConfig(({ mode }) => ({
  plugins: [figmaWidgetReactPlugin, viteSingleFile()],
  build: {
    minify: mode === 'production',
    sourcemap: mode !== 'production' ? 'inline' : false,
    target: 'es2017',
    emptyOutDir: false,
    outDir: path.resolve('dist'),
    rollupOptions: {
      plugins: [preserveDirectives()],
      input: path.resolve('src/plugin/plugin.tsx'),
      output: {
        entryFileNames: 'plugin.js',
      },
    },
  },
  resolve: {
    alias: {
      '@plugin': path.resolve('src/plugin'),
    },
  },
}));
