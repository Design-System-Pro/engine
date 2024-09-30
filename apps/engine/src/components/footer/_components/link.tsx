import type NextLink from 'next/link';
import { Link as StyledLink } from '../../link';
import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink>;
export function Link({ children, ...props }: LinkProps) {
  return (
    <StyledLink
      className="text-zinc-600 hover:text-zinc-400 no-underline"
      {...props}
    >
      {children}
    </StyledLink>
  );
}
