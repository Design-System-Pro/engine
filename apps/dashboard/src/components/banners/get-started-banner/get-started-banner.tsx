import { Button } from '@/components/button';
import { Icons, Text } from '@ds-project/components';
import Link from 'next/link';

export function GetStartedBanner() {
  return (
    <section className="w-full min-h-[40vh] flex justify-center items-center">
      <div className="flex w-full flex-col gap-4 border border-zinc-200 rounded-md p-10 bg-zinc-50 text-zinc-950 items-center">
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
