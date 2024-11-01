'use client';

import * as React from 'react';

import {
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icons,
  LucideIcons,
  PenpotLogo,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@ds-project/components';

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

const groupItems = [
  {
    title: 'Sources',
    icon: LucideIcons.Target,
    items: [
      {
        title: 'Figma',
        url: '/app/sources',
        icon: LucideIcons.Figma,
      },
      {
        title: 'Penpot',
        icon: PenpotLogo,
        disabled: true,
      },
    ],
  },
  {
    title: 'Destinations',
    icon: LucideIcons.Code2,
    items: [
      {
        title: 'GitHub',
        url: '/app/destinations',
        icon: LucideIcons.Github,
      },
      {
        title: 'GitLab',
        icon: LucideIcons.Gitlab,
        disabled: true,
      },
    ],
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
            {groupItems.map((groupItem) => (
              <Collapsible
                key={groupItem.title}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={groupItem.title}>
                      <groupItem.icon />
                      <span>{groupItem.title}</span>
                      <LucideIcons.ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {groupItem.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          {subItem.disabled ? (
                            <SidebarMenuSubButton
                              className={cn({
                                ['opacity-55']: subItem.disabled,
                              })}
                            >
                              <subItem.icon />
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          ) : (
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <subItem.icon />
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
                <Link href="/#faq" target="_blank">
                  <LucideIcons.ShieldQuestion />
                  <span>FAQs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
