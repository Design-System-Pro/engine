'use client';

import { shapes } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  Text,
} from '@ds-project/components';
import Link from 'next/link';
import { useMemo } from 'react';

interface AccountMenuProps {
  email: string;
}

export function AccountMenu({ email }: AccountMenuProps) {
  const avatarUri = useMemo(() => {
    const avatar = createAvatar(shapes, {
      seed: email,
    });

    return avatar.toDataUri();
  }, [email]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="space-x-4">
          <Avatar className="size-8">
            <AvatarImage src={avatarUri} />
            <AvatarFallback>{email}</AvatarFallback>
          </Avatar>

          <Text size="sm">
            <span>Account</span>
          </Text>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuLabel>
          <Text mood="muted" weight="normal">
            <span>{email}</span>
          </Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/auth/logout">
            <Icons.ExitIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
