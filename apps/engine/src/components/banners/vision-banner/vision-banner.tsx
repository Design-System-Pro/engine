import { Text } from '@ds-project/components/server';
import { Card } from './_components/card';
import { Pill } from '@/components/pill';

import designTokensCover from './_assets/design-tokens.png';
import integrationsCover from './_assets/integrations.png';
import communityCover from './_assets/community.png';

const cards = [
  {
    title: 'Design Tokens',
    description:
      'Synchronise, store and release design tokens directly from your design tool to your repositories.',
    coverImage: designTokensCover,
  },
  {
    title: 'Integrations',
    description:
      'Seamlessly integrate your design system ecosystem so the tools work for you. And not the other way around.',
    coverImage: integrationsCover,
  },
  {
    title: 'Community Driven',
    description:
      'Open-source solution, fostering collaboration and shared value.\nJoin our community.',
    coverImage: communityCover,
  },
];

export function VisionBanner() {
  return (
    <section
      id="about"
      className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-11 py-10 text-zinc-950"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <Pill>Reduce complexity</Pill>
        <Text size="2xl" weight={'medium'} align={'center'}>
          <h2>
            Focus on the Design System
            <br /> and less on its operations
          </h2>
        </Text>
      </div>
      <ul className="grid w-full auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card, index) => (
          <li key={index} className="flex flex-col">
            <Card {...card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
