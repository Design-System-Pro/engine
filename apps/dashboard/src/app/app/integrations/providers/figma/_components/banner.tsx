import { config } from '@/config';
import { Button, Icons, Text } from '@ds-project/components';
import Link from 'next/link';
export function FigmaBanner() {
  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <Icons.FigmaLogoIcon height={54} width={54} />
      <div className="flex-1 space-y-1">
        <Text size="base" weight="medium">
          <h2>Figma</h2>
        </Text>
        <Text mood="muted" size="sm">
          <p>
            Install DS Pro widget in your Figma file to synchronize Figma
            Variables
          </p>
        </Text>
      </div>

      <Button asChild>
        <Link href={config.figmaWidgetUrl} target="__blank">
          <span>Install Widget</span>
        </Link>
      </Button>
    </div>
  );
}
