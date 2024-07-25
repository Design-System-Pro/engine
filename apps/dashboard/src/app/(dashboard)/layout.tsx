import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Navigation } from '@/components/navigation/navigation';
import { cn } from '@/lib/utils';

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
        {children}
      </body>
    </html>
  );
}
