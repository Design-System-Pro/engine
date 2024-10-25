import { FigmaLogo, GithubLogo, Icons, Text } from '@ds-project/components';
import { Button } from '../button';
import Image from 'next/image';
import { Pill } from '../pill';
import Link from 'next/link';
import frameImage from './frame-image.png';

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
            <Pill>Early Release</Pill>
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
      <div className="w-7/12 md:w-full overflow-hidden rounded-md">
        <Image src={frameImage} alt="" />
      </div>
      <svg className="absolute w-0 h-0">
        <clipPath id="frame-path" clipPathUnits="objectBoundingBox">
          <path d="M1,0.041 V0.961 C1,0.983,0.985,1,0.965,1 H0.036 C0.017,1,0.001,0.983,0.001,0.961 V0.523 C0.001,0.501,0.017,0.483,0.036,0.483 H0.143 C0.163,0.483,0.18,0.464,0.18,0.441 V0.041 C0.18,0.019,0.196,0.001,0.215,0.001 H0.965 C0.985,0.001,1,0.019,1,0.041"></path>
        </clipPath>
      </svg>
    </section>
  );
}
