import { getMetadata } from '@/lib/metadata';
import { Figma } from './figma/_rsc/figma';
import { Penpot } from './penpot/_rsc/penpot';

export const metadata = getMetadata({ title: 'Inputs' });

export default function Page() {
  return (
    <section className="flex flex-wrap gap-2">
      <Figma />
      <Penpot />
    </section>
  );
}
