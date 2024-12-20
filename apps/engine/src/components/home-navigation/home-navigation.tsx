import { Button } from '@ds-project/components';
import Image from 'next/image';
import Link from 'next/link';
import logoSvg from './assets/ds-logo.svg';
import { config } from '@/config';
import { DashboardLink } from './dashboard-link';

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
export function HomeNavigation() {
  return (
    <nav className="m-3 flex max-w-screen-sm justify-between gap-4 rounded-xl border border-gray-300 bg-white p-2 shadow">
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
        <li>
          <DashboardLink />
        </li>
      </ul>

      <Button asChild>
        <Link href={config.figmaWidgetUrl}>Install</Link>
      </Button>
    </nav>
  );
}
