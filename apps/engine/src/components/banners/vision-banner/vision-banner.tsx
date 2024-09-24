import { Text } from '@ds-project/components';
import { Card } from './_components/card';
import { Pill } from '@/components/pill';

const cards = [
  {
    title: 'Design Tokens',
    description:
      'Synchronise, store and release design tokens directly from your design tool to your repositories.',
  },
  {
    title: 'Integrations',
    description:
      'Seamlessly integrate your design system ecosystem so the tools work for you. And not the other way around.',
  },
  {
    title: 'Community Driven',
    description:
      'Open-source solution, fostering collaboration and shared value.\nJoin our community.',
  },
];

export function VisionBanner() {
  return (
    <section
      id="about"
      className="flex w-full flex-col gap-11 py-10 min-h-[80vh] text-zinc-950 justify-center items-center"
    >
      <div className="w-full flex flex-col items-center gap-4">
        <Pill>Reduce complexity</Pill>
        <Text size="2xl" weight={'medium'} align={'center'}>
          <h2>
            Focus on the Design System
            <br /> and less on its operations
          </h2>
        </Text>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 w-full">
        {cards.map((card, index) => (
          <li key={index} className="flex flex-col">
            <Card {...card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
