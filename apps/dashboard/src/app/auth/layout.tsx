import type { Metadata } from 'next';

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
    <div className={'min-h-screen flex flex-col justify-center items-center'}>
      {children}
    </div>
  );
}
