import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  children: React.ReactNode;
  asChild?: boolean;
}
export function Link({ className, asChild, children, ...props }: LinkProps) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      className={cn(
        'ds-text-[currentColor] ds-underline ds-underline-offset-2 ds-fluid-text-sm',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
