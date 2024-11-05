import { Button, Icons, Text } from '@ds-project/components/server';
import Link from 'next/link';
import { CloseWindowButton } from './_components/close-window-button';

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Text size="2xl" weight="medium">
        <h1>Figma Widget is connected!</h1>
      </Text>
      <Text>
        <p>You can now close this window and go back to Figma.</p>
      </Text>
      <div className="flex gap-2">
        <CloseWindowButton />
        <Button variant="outline" asChild>
          <Link href="/app" className="space-x-2">
            <Icons.HomeIcon />
            <span>Go to Dashboard</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
