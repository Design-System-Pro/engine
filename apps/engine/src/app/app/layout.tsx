import { api } from '@ds-project/api/rsc';
import { getMetadata } from '@/lib/metadata';

import type { ReactNode } from 'react';
import { AppLayout } from '@/modules/app-layout';

export const metadata = getMetadata({ title: 'Dashboard' });

export default async function RootLayout({
  connections,
}: Readonly<{
  connections: ReactNode;
}>) {
  // const tabsSegment = useSelectedLayoutSegment('tabs');
  // const projects = await api.projects.getAll();
  const user = await api.users.getCurrent();
  // const showReleases = await getShowReleasesFlag();

  return <AppLayout email={user.email}>{connections}</AppLayout>;
}
