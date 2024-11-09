import { Link } from '@/components/link';
import { config } from '@/config';
import { Text } from '@ds-project/components/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ds-project/components/client';

const items = [
  {
    title: 'Who am I?',
    content: (
      <p>
        Hello! I'm Tomás, the builder of DS Pro. I'm glad you're here.
        <br />
        Reach out to me at{' '}
        <Link href={`mailto:${config.supportEmail}`}>
          {config.supportEmail}
        </Link>{' '}
        or join our <Link href={config.communityInviteUrl}>Discord</Link>.
      </p>
    ),
  },
  {
    title: 'What is DS Pro about?',
    content: (
      <p>
        DS Pro is an open source solution to build Design Systems in an easier
        and faster way.
        <br />
        Think of it as an infrastructure provider that allows designers and
        developers to connect and run all the pieces of a design system
        together.
      </p>
    ),
  },
  {
    title: 'What can I do with DS Pro?',
    content: (
      <p>
        Currently, DS Pro allows to synchronize your Design Tokens from Figma to
        your code repository in GitHub.
        <br />
        More integrations are coming soon. Any feedback or suggestions in our{' '}
        <Link href={config.feedbackUrl}>feedback board</Link> is highly welcome.
      </p>
    ),
  },
  {
    title: 'How to synchronize Figma Variables with GitHub?',
    content: (
      <div className="flex flex-col gap-4">
        <p>
          Currently, DS Pro allows to synchronize your transformed Figma
          Variables into Design Tokens from Figma and commit them to GitHub for
          you.
        </p>
        <div className="relative h-0 pb-[62.391681109185434%]">
          <iframe
            title="DS Pro - Synchronize Figma Variables with GitHub"
            src="https://www.loom.com/embed/3b7d0f6092874932a606b2b9e163b3cf?sid=c6b978f0-a1f5-4d5d-899d-90089726304d"
            allowFullScreen
            className="absolute left-0 top-0 size-full rounded-md border-0"
          />
        </div>
      </div>
    ),
  },
  {
    title: 'What does Early Release mean?',
    content: (
      <p>
        DS Pro is currently in its early-release stage, meaning it’s still
        undergoing development and refinement.
        <br />
        During this phase, <b>data, features, and APIs may change</b>, which can
        affect stability. As a result, DS Pro is not yet recommended for use in
        production environments.
      </p>
    ),
  },
];

export function FaqBanner() {
  return (
    <div id="faq" className="flex w-full flex-col items-center gap-4">
      <Text size="2xl" weight={'medium'} align={'center'}>
        <h2>Frequently asked questions</h2>
      </Text>
      <Accordion type="single" collapsible className="w-full max-w-screen-md">
        {items.map((item, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
