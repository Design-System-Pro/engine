import { Button } from '../../components/button';
import { AutoLayout, Text } from '../../lib/widget';
import { useAuthActions } from './auth.actions';

export function AuthWarning() {
  const { isConnected, connect } = useAuthActions();

  if (isConnected) {
    return null;
  }

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      width={'fill-parent'}
      horizontalAlignItems="center"
    >
      <Text fontWeight="bold" fontSize={16}>
        Connect to DS
      </Text>
      <Text
        width="fill-parent"
        fontSize={14}
        horizontalAlignText="center"
        fill="#808080"
      >
        Connect this widget to DS to synchronize variables and other assets
        directly from this Figma file.
      </Text>
      <Button onClick={connect}>Connect to DS</Button>
    </AutoLayout>
  );
}
