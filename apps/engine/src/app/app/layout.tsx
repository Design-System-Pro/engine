import { AppNavigation } from '@/components';
import { api } from '@ds-project/api/rsc';
import { getMetadata } from '@/lib/metadata';

export const metadata = getMetadata({ title: 'Dashboard' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await api.projects.getAll();
  const user = await api.users.getCurrent();

  return (
    <>
      <header className="sticky top-0 w-full">
        <AppNavigation
          className="px-2 pt-2"
          projects={projects}
          email={user.email}
        />
      </header>
      <main className="flex min-h-screen w-full flex-col items-center py-2">
        {children}
      </main>
    </>
  );
}
