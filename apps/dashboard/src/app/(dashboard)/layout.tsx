import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Navigation } from '@/components';
import { cn } from '@/lib/css';
import { api } from '@ds-project/api/rsc';

const inter = Inter({ subsets: ['latin'] });

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

  return (
    <html lang="en">
      <body className={cn('flex flex-col items-center', inter.className)}>
        <header className="sticky top-0 w-full">
          <Navigation className="px-2 pt-2" projects={projects} />
        </header>
        <main className="flex min-h-screen w-full flex-col items-center py-2">
          {children}
        </main>
      </body>
    </html>
  );
}
