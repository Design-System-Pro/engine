import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Navigation } from '@/components';
import { cn } from '@/lib/css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DS Project',
  description: 'Manage Design System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('flex flex-col items-center', inter.className)}>
        <Navigation className="mt-6" />
        <main className="flex min-h-screen w-full flex-col items-center p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
