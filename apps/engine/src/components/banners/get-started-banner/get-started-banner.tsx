import { Button } from '@/components/button';
import { Icons, Text } from '@ds-project/components/server';
import Link from 'next/link';

export function GetStartedBanner() {
  return (
    <section className="flex min-h-[40vh] w-full items-center justify-center">
      <div className="flex w-full flex-col items-center gap-4 rounded-md border border-zinc-200 bg-zinc-50 p-10 text-zinc-950">
        <Text size="lg" align={'center'}>
          <h4>
            Get started with DS and elevate the developer experience and
            productivity across your design and engineering teams
          </h4>
        </Text>
        <div>
          <Button asChild mode="dark">
            <Link href="/app">
              Get Started <Icons.ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
