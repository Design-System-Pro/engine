import { AppSidebar } from '@/components';
import { api } from '@ds-project/api/rsc';
import { getMetadata } from '@/lib/metadata';
import { getShowReleasesFlag } from '@/lib/flags';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@ds-project/components';
import type { ReactNode } from 'react';

export const metadata = getMetadata({ title: 'Dashboard' });

export default async function RootLayout({
  connections,
}: Readonly<{
  connections: ReactNode;
}>) {
  // const tabsSegment = useSelectedLayoutSegment('tabs');
  const projects = await api.projects.getAll();
  const user = await api.users.getCurrent();
  const showReleases = await getShowReleasesFlag();

  return (
    <SidebarProvider>
      {/* <header className="sticky top-0 w-full"> */}
      {/* <AppNavigation
          className="px-2 pt-2"
          projects={projects}
          email={user.email}
          showReleases={showReleases}
        /> */}
      <AppSidebar email={user.email} />
      {/* </header> */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div> */}
        {connections}
      </SidebarInset>
      {/* <main
      // className="flex min-h-screen w-full flex-col items-center"
      >
        <SidebarTrigger />
        {children}
      </main> */}
    </SidebarProvider>
  );
}
