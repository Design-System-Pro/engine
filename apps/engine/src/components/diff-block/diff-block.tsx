'use client';

import { Text } from '@ds-project/components/server';
import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import { DiffMethod } from 'react-diff-viewer';

const ReactDiffViewer = dynamic(() => import('react-diff-viewer'), {
  ssr: false,
  loading: () => (
    <Text>
      <p>Loading tokens...</p>
    </Text>
  ),
});

export function DiffBlock(props: ComponentProps<typeof ReactDiffViewer>) {
  return (
    <ReactDiffViewer
      codeFoldMessageRenderer={(numberOfLines) => (
        <Text size="xs" weight="medium">
          <p>Syncronized. Expand {numberOfLines} of lines...</p>
        </Text>
      )}
      compareMethod={DiffMethod.LINES}
      {...props}
    />
  );
}
