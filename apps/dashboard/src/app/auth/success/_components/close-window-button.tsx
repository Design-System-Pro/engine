'use client';
import { Button } from '@ds-project/components';

export function CloseWindowButton() {
  return <Button onClick={() => window.close()}>Close this window</Button>;
}
