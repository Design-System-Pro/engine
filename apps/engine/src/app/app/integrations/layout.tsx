'use client';

import { MainContent } from '@/components';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ds-project/components';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import type { ReactNode } from 'react';

export default function Layout({
  tabs,
}: Readonly<{
  tabs: ReactNode;
}>) {
  const tabsSegment = useSelectedLayoutSegment('tabs');

  return (
    <MainContent
      description="Authorize and manage integrations"
      title="Integrations"
    >
      <div className="flex flex-col gap-2"></div>
      <Tabs defaultValue="inputs" value={tabsSegment ?? undefined}>
        <TabsList>
          <TabsTrigger value="inputs" asChild>
            <Link href={'/app/integrations/inputs'}>Inputs</Link>
          </TabsTrigger>
          <TabsTrigger value="outputs" asChild>
            <Link href={'/app/integrations/outputs'}>Outputs</Link>
          </TabsTrigger>
          <TabsTrigger value="notifications" asChild>
            <Link href={'/app/integrations/notifications'}>Notifications</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={tabsSegment ?? 'inputs'}>{tabs}</TabsContent>
      </Tabs>
    </MainContent>
  );
}
