'use client';
import { Button } from '@ds-project/components/server';

export function CloseWindowButton() {
  return <Button onClick={() => window.close()}>Close this window</Button>;
}
