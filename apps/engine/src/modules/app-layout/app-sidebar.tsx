'use client';

import * as React from 'react';

import { Icons, LucideIcons } from '@ds-project/components';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@ds-project/components';

import Link from 'next/link';
import { AccountMenu } from './acocunt-menu';
import { config } from '@/config';

const navigationItems = [
  {
    title: 'GitHub',
    url: '/app/destinations',
    icon: LucideIcons.Github,
  },
  {
    title: 'Figma',
    url: '/app/sources',
    icon: LucideIcons.Figma,
  },
];

export function AppSidebar({ email }: { email: string }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              DS
              <span className="truncate font-semibold">Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Connections</SidebarGroupLabel>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Shortcuts</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={config.discordInviteUrl} target="_blank">
                  <Icons.DiscordLogoIcon />
                  <span>Discord</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={config.feedbackUrl} target="_blank">
                  <LucideIcons.MessageSquareDot /> <span>Feedback</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <AccountMenu email={email} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
