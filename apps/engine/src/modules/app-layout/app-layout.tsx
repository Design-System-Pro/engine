import {
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@ds-project/components/client';
import { BreadcrumbNav } from './breadcrumb-nav';
import { AppSidebar } from './app-sidebar';

export function AppLayout({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar email={email} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbNav />
          </div>
        </header>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
