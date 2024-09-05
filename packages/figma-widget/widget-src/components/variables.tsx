import { updateIcon } from '../icons/update';
import { AutoLayout, SVG, Text } from '../lib/widget';
import { Button } from './button';

interface VariablesProps {
  lastSynced?: string;
}

export function Variables({ lastSynced }: VariablesProps) {
  return (
    <AutoLayout
      name="Variables"
      direction="horizontal"
      verticalAlignItems="center"
      width="fill-parent"
      spacing={8}
      padding={16}
      cornerRadius={8}
      fill="#FFFFFF"
      stroke="#E6E6E6"
    >
      <AutoLayout direction="vertical" verticalAlignItems="center" spacing={8}>
        <Text fontSize={16} fontWeight="bold">
          🧩 Local variables
        </Text>

        <Text fontSize={14} fill="#808080">
          {lastSynced
            ? `Last synced ${lastSynced}`
            : 'This is your first time syncing 🚀'}
        </Text>
      </AutoLayout>

      <AutoLayout horizontalAlignItems="end" width="fill-parent">
        <Button variant="outline" onClick={() => {}}>
          <SVG width={15} height={15} src={updateIcon} />
        </Button>
      </AutoLayout>
    </AutoLayout>
  );
}
