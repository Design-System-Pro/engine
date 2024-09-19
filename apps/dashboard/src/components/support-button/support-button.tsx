import { config } from '@/config';
import { Button, LucideIcons } from '@ds-project/components';
import Link from 'next/link';

export function SupportButton() {
  return (
    <Button variant="ghost" className="space-x-2" asChild>
      <Link
        href={`mailto:${config.supportEmail}?subject=Support request`}
        target="_blank"
      >
        <LucideIcons.LifeBuoy />
        <span>Support</span>
      </Link>
    </Button>
  );
}
