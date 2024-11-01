import { getMetadata } from '@/lib/metadata';
import { Github } from './github/_rsc/github';
import { Gitlab } from './gitlab/_rsc/gitlab';

export const metadata = getMetadata({ title: 'Outputs' });

export default function Page() {
  return (
    <section className="flex flex-wrap gap-2">
      <Github />
      {/* <Gitlab /> */}
    </section>
  );
}
