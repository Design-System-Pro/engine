import { Button } from '@ds-project/components';
import Image from 'next/image';
import Link from 'next/link';
import logoSvg from './assets/ds-logo.svg';
import { config } from '@/config';

const navigationItems = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Community',
    href: '#community',
  },
  {
    label: 'Sign Up',
    href: '/auth/sign-in',
  },
];
export function HomeNavigation() {
  return (
    <nav className="bg-white border border-gray-300 rounded-xl flex p-2 shadow m-3 justify-between max-w-screen-sm gap-4">
      <Button variant="ghost">
        <Image src={logoSvg} alt="DS Pro Logo - Redirects to Homepage" />
      </Button>
      <ul className="flex">
        {navigationItems.map((item) => (
          <li key={`${item.label}-${item.href}`}>
            <Button variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </li>
        ))}
      </ul>

      <Button asChild>
        <Link href={config.figmaWidgetUrl}>Install</Link>
      </Button>
    </nav>
  );
}
