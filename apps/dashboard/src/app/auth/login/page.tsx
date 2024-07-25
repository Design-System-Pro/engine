import { Icons } from '@ds-project/components';
import { InitFigmaAuth } from '@/lib/figma-auth/init-figma-auth';
import { MagicLinkForm } from './magic-link-form';

export default function Page() {
  return (
    <section className="flex max-w-sm flex-col items-center gap-6">
      <Icons.EnterIcon height={64} width={64} />
      <MagicLinkForm />
      <InitFigmaAuth />
    </section>
  );
}
