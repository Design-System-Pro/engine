import { AppNavigation } from '@/components';
import { api } from '@ds-project/api/rsc';
import { getMetadata } from '@/lib/metadata';
import { getShowReleasesFlag } from '@/lib/flags';

export const metadata = getMetadata({ title: 'Dashboard' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await api.projects.getAll();
  const user = await api.users.getCurrent();
  const showReleases = await getShowReleasesFlag();

  return (
    <>
      <header className="sticky top-0 w-full">
        <AppNavigation
          className="px-2 pt-2"
          projects={projects}
          email={user.email}
          showReleases={showReleases}
        />
      </header>
      <main className="flex min-h-screen w-full flex-col items-center">
        {children}
      </main>
    </>
  );
}
