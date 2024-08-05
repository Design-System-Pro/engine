'use client';

import { Button } from '@ds-project/components';
import { useCallback } from 'react';
import type { DesignTokens } from 'style-dictionary/types';
import { updateTokens } from '../_actions/update-tokens.action';

export function PushButton({ tokens }: { tokens: DesignTokens }) {
  const onClickHandler = useCallback(() => {
    void updateTokens(tokens);
  }, [tokens]);

  return <Button onClick={onClickHandler}>Push changes</Button>;
}
