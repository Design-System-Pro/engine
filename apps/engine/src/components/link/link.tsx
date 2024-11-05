import NextLink from 'next/link';
import { Link as StyledLink } from '@ds-project/components/server';
import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink>;
export function Link({ children, ...props }: LinkProps) {
  return (
    <StyledLink asChild>
      <NextLink {...props}>{children}</NextLink>
    </StyledLink>
  );
}
