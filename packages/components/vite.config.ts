import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { peerDependencies, dependencies } from "./package.json";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    dts({ rollupTypes: true }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      formats: ["es"],
      fileName: (ext) => `index.${ext}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    target: "esnext",
    sourcemap: true,
    emptyOutDir: true,
  },
});
