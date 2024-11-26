import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { defineConfig } from '@terrazzo/cli';
import { build, parse } from '@terrazzo/parser';
import pluginCSS from '@terrazzo/plugin-css';
import { writeFileSync } from 'fs';

const TOKENS_FILE = 'tokens.json';

export async function POST(request: NextRequest) {
  const { tokens } = (await request.json()) as {
    tokens: object;
  };

  const { tokens: normalizedTokens, sources } = await parse([
    {
      src: tokens,
    },
  ]);

  writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));

  const config = defineConfig({
    tokens: TOKENS_FILE,
    outDir: `./dist/`,
    plugins: [
      pluginCSS({
        filename: 'tokens.css',
      }),
    ],
  });

  const buildResult = await build(normalizedTokens, { sources, config });

  return NextResponse.json(
    {
      buildResult,
    },
    {
      status: 200,
    }
  );
}
