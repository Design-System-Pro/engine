import { Icons } from '@ds-project/components';
import { MagicLinkForm } from './_components';

export default function Page() {
  return (
    <section className="flex max-w-sm flex-col items-center gap-6">
      <Icons.EnterIcon height={64} width={64} />
      <MagicLinkForm />
    </section>
  );
}
