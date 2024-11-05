import Quickstart from './quickstart/page.mdx';
import { getMetadata } from '@/lib/metadata';

export const metadata = getMetadata({ title: 'Outputs' });

export default function Page() {
  return <Quickstart />;
}
