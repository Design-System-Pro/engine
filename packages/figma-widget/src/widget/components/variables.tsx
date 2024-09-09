import { updateIcon } from '../icons/update';
import { AutoLayout, SVG, Text } from '../lib/widget';
import { Button } from './button';

interface VariablesProps {
  lastSyncedAt: number | null;
  onSyncVariablesClick: () => void;
}

export function Variables({
  lastSyncedAt,
  onSyncVariablesClick,
}: VariablesProps) {
  const formatDate = (date: Date) => {
    return date
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(',', '');
  };

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
          {lastSyncedAt
            ? `Last synced ${formatDate(new Date(lastSyncedAt))}`
            : 'This is your first time syncing 🚀'}
        </Text>
      </AutoLayout>

      <AutoLayout horizontalAlignItems="end" width="fill-parent">
        <Button variant="outline" onClick={onSyncVariablesClick}>
          <SVG width={15} height={15} src={updateIcon} />
        </Button>
      </AutoLayout>
    </AutoLayout>
  );
}
