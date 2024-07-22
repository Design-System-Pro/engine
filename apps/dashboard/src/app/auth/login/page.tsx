import { MagicLinkForm } from './magic-link-form';
import { Icons } from '@ds-project/components';

export default async function Page() {
  return (
    <section className="flex max-w-sm flex-col items-center gap-6">
      <Icons.EnterIcon width={64} height={64} />
      <MagicLinkForm />
    </section>
  );
}
