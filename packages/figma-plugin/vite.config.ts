import { defineConfig } from "vite";
import packageJson from "./package.json";

const config = defineConfig(({ mode }) => {
  const isDev = mode === "development";
  return {
    build: {
      outDir: "build",
      minify: !isDev,
      watch: isDev ? {} : null,
      sourcemap: isDev,
      lib: {
        entry: "./src/main.ts",
        name: packageJson.name,
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          entryFileNames: "main.js",
          extend: true,
        },
      },
    },
  };
});

export default config;
