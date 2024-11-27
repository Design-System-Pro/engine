'use client';

import * as React from 'react';

import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icons,
  LucideIcons,
  PenpotLogo,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
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
        notImplemented: true,
        roadmapLink: 'https://ds-project.supahub.com/p/integration-with-penpot',
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
        notImplemented: true,
        roadmapLink: 'https://ds-project.supahub.com/p/integration-with-gitlab',
      },
    ],
  },
];

export function AppSidebar({ email }: { email: string }) {
  return (
    <Sidebar collapsible="none" className="h-screen">
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
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/app/getting-started/quickstart">
                  <LucideIcons.Rocket /> Quickstart
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
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
                          {subItem.notImplemented ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <SidebarMenuSubButton
                                  className="opacity-55"
                                  asChild
                                >
                                  <Link href={subItem.roadmapLink}>
                                    <subItem.icon />
                                    <span>{subItem.title}</span>
                                    <Badge variant="outline">Roadmap</Badge>
                                  </Link>
                                </SidebarMenuSubButton>
                              </TooltipTrigger>
                              <TooltipPortal>
                                <TooltipContent side="right">
                                  Click on this feature to up vote on our
                                  roadmap
                                </TooltipContent>
                              </TooltipPortal>
                            </Tooltip>
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
                <Link href={config.communityInviteUrl} target="_blank">
                  <Icons.DiscordLogoIcon />
                  <span>Community</span>
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
