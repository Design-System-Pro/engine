import { FigmaLogo, GithubLogo, Icons, Text } from '@ds-project/components';
import { Button } from '../button';
import Image from 'next/image';
import frame from './frame.svg';
import { Pill } from '../pill';
import Link from 'next/link';

const compatibleWith = [
  {
    title: 'GitHub',
    children: <GithubLogo width={15} height={15} />,
  },
  {
    title: 'Figma',
    children: <FigmaLogo width={15} height={15} />,
  },
];

export function Hero() {
  return (
    <section className="min-h-[70vh] w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center h-full py-4">
      <div className="space-y-24">
        <div className="space-y-6">
          <div className="space-y-2">
            <Text
              size="3xl"
              weight="semibold"
              leading="snug"
              className="text-zinc-950"
            >
              <h1>The DevOps Platform for Design Systems</h1>
            </Text>
            <Text
              size="base"
              leading="tight"
              weight="light"
              className="text-zinc-500"
            >
              <p>
                Release and manage Design Systems at scale without overwhelming
                your engineers and designers.
              </p>
            </Text>
          </div>
          <div className="flex gap-2">
            <Button mode="dark" asChild>
              <Link href="/app">
                Sign Up <Icons.ArrowRightIcon className="ml-2" />
              </Link>
            </Button>
            <Button asChild>
              <Link
                href="https://github.com/Design-System-Project/platform"
                target="_blank"
              >
                <Icons.GitHubLogoIcon className="mr-2" /> Explore
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Text size="xs" weight="light" className="text-zinc-500">
            <p>Compatible with:</p>
          </Text>
          <ul className="flex gap-2">
            {compatibleWith.map((item, index) => (
              <li key={index}>
                <Pill>
                  {item.children} {item.title}
                </Pill>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-7/12 md:w-full">
        <Image src={frame} alt="" />
      </div>
    </section>
  );
}
