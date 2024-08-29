import { Footer } from '@/components/footer';
import { NavigationBar } from '@/components/navigation-bar/navigation-bar';
import './home.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="landing-bg" />
      <header className="sticky top-0 w-full flex justify-center">
        <NavigationBar />
      </header>
      <main className="flex min-h-screen w-full flex-col items-center py-2">
        {children}
      </main>
      <Footer />
    </>
  );
}
