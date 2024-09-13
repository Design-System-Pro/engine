import { Footer } from '@/components/footer';
import { HomeNavigation } from '@/components/home-navigation';
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
        <HomeNavigation />
      </header>
      <main className="flex min-h-screen w-full flex-col items-center py-2">
        {children}
      </main>
      <Footer />
    </>
  );
}
