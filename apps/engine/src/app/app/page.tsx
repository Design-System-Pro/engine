import { MainContent } from '@/components';
import { config } from '@/config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ds-project/components';
import Link from 'next/link';

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
        or join our <Link href={config.discordInviteUrl}>Discord</Link>.
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
];

export default function Home() {
  return (
    <MainContent
      description="DS Pro is in experimental phase. Your data or features might change or get lost with no warning."
      title="Welcome 👋"
    >
      <div className="flex justify-center w-full">
        <Accordion type="single" collapsible className="w-full max-w-screen-md">
          {items.map((item, index) => (
            <AccordionItem value={index.toString()}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MainContent>
  );
}
