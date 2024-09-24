import {
  Icons,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ds-project/components';
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
