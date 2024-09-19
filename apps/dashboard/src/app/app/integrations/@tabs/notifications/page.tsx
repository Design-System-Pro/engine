import { getMetadata } from '@/lib/metadata';
import { Discord } from './discord/_rsc/discord';
import { Slack } from './slack/_rsc/slack';

export const metadata = getMetadata({ title: 'Notifications' });

export default function Page() {
  return (
    <section className="flex flex-wrap gap-2">
      <Discord />
      <Slack />
    </section>
  );
}
