import { Button } from '@ds-project/components/server';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/css';
import logo from './logo.svg';

export function HomeButton({ className }: { className?: string }) {
  return (
    <Button
      asChild
      className={cn('border border-slate-200', className)}
      variant="ghost"
    >
      <Link href="/app">
        <Image alt="Home" height={32} src={logo} width={32} />
      </Link>
    </Button>
  );
}
