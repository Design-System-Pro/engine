import { Icons } from '@ds-project/components';
import { Message } from './message';

export default function Page() {
  return (
    <section className="flex max-w-sm flex-col items-center gap-6">
      <Icons.CrossCircledIcon />
      <Message />
    </section>
  );
}
