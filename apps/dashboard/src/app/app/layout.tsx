import type { Metadata } from 'next';
import { AppNavigation } from '@/components';
import { api } from '@ds-project/api/rsc';

export const metadata: Metadata = {
  title: 'DS Project',
  description: 'Manage Design System',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await api.projects.account();
  const user = await api.users.current();

  return (
    <>
      <header className="sticky top-0 w-full">
        <AppNavigation
          className="px-2 pt-2"
          projects={projects}
          email={user?.email ?? 'Account'}
        />
      </header>
      <main className="flex min-h-screen w-full flex-col items-center py-2">
        {children}
      </main>
    </>
  );
}
