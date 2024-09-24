import { cn } from '@ds-project/components';
import type { ReactNode } from 'react';

interface PillProps {
  className?: string;
  children: ReactNode;
}

export function Pill({ className, ...props }: PillProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 border border-zinc-200 rounded-full py-2 px-4',
        className
      )}
      {...props}
    />
  );
}
