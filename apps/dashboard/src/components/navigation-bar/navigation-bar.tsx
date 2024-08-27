import { Button } from '@ds-project/components';
import Image from 'next/image';
import Link from 'next/link';
import logoSvg from './assets/ds-logo.svg';

const navigationItems = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Community',
    href: '#community',
  },
];
export function NavigationBar() {
  return (
    <nav className="bg-white border border-gray-300 rounded-xl flex p-2 shadow m-3 justify-between max-w-screen-sm gap-4">
      <Button variant="ghost">
        <Image
          src={logoSvg}
          alt="Design System Project Logo - Redirects to Homepage"
        />
      </Button>
      <ul className="flex">
        {navigationItems.map((item) => (
          <li>
            <Button variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
      <Button asChild>
        <Link href="/auth/login">Sign Up</Link>
      </Button>
    </nav>
  );
}
