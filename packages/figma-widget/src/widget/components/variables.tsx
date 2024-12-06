import { updateIcon } from '../icons/update';
import { AutoLayout, SVG, Text } from '../lib/widget';
import { Button } from './button';
import { format } from 'date-fns';

interface VariablesProps {
  lastSyncedAt: string | null;
  onSyncVariablesClick: () => void;
  onInjectVariableClick: () => void;
}

export function Variables({
  lastSyncedAt,
  onSyncVariablesClick,
  onInjectVariableClick,
}: VariablesProps) {
  const formatDate = (date: string) => {
    return format(date, 'dd/MM/yyyy, HH:mm');
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
            ? `Last synced: ${formatDate(lastSyncedAt)}`
            : 'This is your first time syncing 🚀'}
        </Text>
      </AutoLayout>

      <AutoLayout horizontalAlignItems="end" width="fill-parent">
        <Button variant="outline" onClick={onSyncVariablesClick}>
          <SVG width={15} height={15} src={updateIcon} />
        </Button>
        <Button variant="outline" onClick={onInjectVariableClick}>
          Inject Variable
        </Button>
      </AutoLayout>
    </AutoLayout>
  );
}
