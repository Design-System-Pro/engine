import { Button, Icons, Text } from '@ds-project/components/server';

interface InstallReleaseProps {
  packageName: string;
}
export function InstallRelease({ packageName }: InstallReleaseProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-black px-3 py-2 text-white">
      <Text family="mono" size="sm">
        <code>
          <Text weight="bold">
            <span>pnpm</span>
          </Text>{' '}
          add {packageName}
        </code>
      </Text>
      <Button size="icon" variant="ghost">
        <Icons.CopyIcon />
      </Button>
    </div>
  );
}
