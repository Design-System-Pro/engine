import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import preserveDirectives from 'rollup-preserve-directives';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  assetsInclude: ['**/*.md'],
  build: {
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      plugins: [preserveDirectives()],
    },
  },
});
