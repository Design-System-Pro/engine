'use client';

import { Text } from '@ds-project/components';
import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';

const DynamicReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
  loading: () => (
    <Text>
      <p>Loading tokens...</p>
    </Text>
  ),
});

export function JsonBlock({
  ...props
}: ComponentProps<typeof DynamicReactJson>) {
  return <DynamicReactJson {...props} />;
}
