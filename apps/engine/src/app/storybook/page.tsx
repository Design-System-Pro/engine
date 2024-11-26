'use client';

import { useCallback, useRef, useState } from 'react';
import Framebus from 'framebus';

import TOKENS from '@design-system-pro/ds-tokens/tokens.json';
import { getCssVariables } from './css-variables.action';
import { TokenEditorGrid } from './_components/flatten-token-editor';
import type { Group } from '@terrazzo/token-tools';
export default function Page() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const bus = new Framebus();
  const [tokens, setTokens] = useState<Group>(TOKENS as Group);

  const onTokensChange = useCallback(
    (updatedTokens: Group) => {
      // console.log('onTokensChange', { sources, tokens });
      getCssVariables(updatedTokens)
        .then((result) => {
          console.log({ result });
          bus.emit('style-changes', { result });
        })
        .catch(console.error);
    },
    [bus]
  );

  return (
    <div className="grid min-h-screen w-full grid-cols-2 rounded-md border p-2">
      <section className="flex max-h-screen flex-col gap-2 overflow-auto">
        {/* <TokensEditor tokens={tokens} onTokensChange={onTokensChange} /> */}
        <TokenEditorGrid tokens={tokens} onChange={onTokensChange} />

        {/* <JsonBlock
          src={TOKENS}
          collapsed={true}
          // onEdit={({ updated_src }) => setTokens(updated_src as typeof tokens)}
        /> */}
      </section>
      <iframe
        ref={iframeRef}
        src="http://localhost:6006"
        title="Storybook"
        className="min-h-screen w-full"
      />
    </div>
  );
}
