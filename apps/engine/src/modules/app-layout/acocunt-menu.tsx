'use client';

import { shapes } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LucideIcons,
  SidebarMenuButton,
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
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8 rounded-lg">
            {/* TODO: improve alt description, perhaps with user name when we ask for it */}
            <AvatarImage src={avatarUri} alt={'User avatar'} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{email}</span>
            <span className="truncate text-xs">{email}</span>
          </div>
          <LucideIcons.ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              {/* TODO: improve alt description, perhaps with user name when we ask for it */}
              <AvatarImage src={avatarUri} alt={'User avatar'} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{email}</span>
              <span className="truncate text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LucideIcons.Home className="mr-2" />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/logout">
            <LucideIcons.LogOut className="mr-2" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
