import { Button } from '@ds-project/components';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import logo from './logo.svg';

export function HomeButton({ className }: { className?: string }) {
  return (
    <Button asChild className={cn(className)} variant="ghost">
      <Link href="/">
        <Image alt="Home" height={32} src={logo} width={32} />
      </Link>
    </Button>
  );
}
