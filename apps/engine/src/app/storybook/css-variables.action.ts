'use server';
import { defineConfig } from '@terrazzo/cli';
import { build, parse } from '@terrazzo/parser';
import pluginCSS from '@terrazzo/plugin-css';
import type { Group } from '@terrazzo/token-tools';

const TOKENS_FILE = 'tokens.json';

export async function getCssVariables(tokens: Group) {
  const config = defineConfig({
    tokens: TOKENS_FILE,
    outDir: `./dist/`,
    plugins: [
      pluginCSS({
        filename: 'tokens.css',
      }),
    ],
  });

  const result = await parse([{ src: tokens }], { config });

  const buildResult = await build(result.tokens, {
    sources: result.sources,
    config,
  });

  return buildResult;
}
