import {
  Button,
  FigmaLogo,
  GithubLogo,
  Icons,
  Text,
} from '@ds-project/components/server';
import Image from 'next/image';
import { Pill } from '../pill';
import Link from 'next/link';
import frameImage from './frame-image.png';
import { config } from '@/config';

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
    <section className="grid size-full min-h-[70vh] max-w-screen-lg grid-cols-1 items-center justify-items-center gap-6 py-4 md:grid-cols-2">
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
              <h1>Your Design System Engine</h1>
            </Text>
            <Text
              size="base"
              leading="tight"
              weight="light"
              className="text-zinc-500"
            >
              <p>
                Focus more on your Design System decisions and less on the tools
                and integrations
              </p>
            </Text>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href={config.figmaWidgetUrl}>
                <Icons.FigmaLogoIcon className="mr-2" /> Install Figma Widget
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/auth/sign-in" target="_blank">
                Sign Up
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
      <div className="w-7/12 overflow-hidden rounded-md md:w-full">
        <Image src={frameImage} alt="" />
      </div>
      <svg className="absolute size-0">
        <clipPath id="frame-path" clipPathUnits="objectBoundingBox">
          <path d="M1,0.041 V0.961 C1,0.983,0.985,1,0.965,1 H0.036 C0.017,1,0.001,0.983,0.001,0.961 V0.523 C0.001,0.501,0.017,0.483,0.036,0.483 H0.143 C0.163,0.483,0.18,0.464,0.18,0.441 V0.041 C0.18,0.019,0.196,0.001,0.215,0.001 H0.965 C0.985,0.001,1,0.019,1,0.041"></path>
        </clipPath>
      </svg>
    </section>
  );
}
