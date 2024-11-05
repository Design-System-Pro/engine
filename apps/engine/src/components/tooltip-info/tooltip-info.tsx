import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ds-project/components/client';
import { Icons } from '@ds-project/components/server';
import type { ReactNode } from 'react';

interface TooltipInfoProps {
  children?: ReactNode;
}

export function TooltipInfo({ children }: TooltipInfoProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Icons.QuestionMarkCircledIcon />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
}
