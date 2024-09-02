import { useAuth } from './auth-provider';

const { widget } = figma;
const { useEffect, Text, AutoLayout, Rectangle } = widget;

export function ConnectButton() {
  const { login } = useAuth();

  return (
    <AutoLayout
      fill="#0E1739"
      padding={{ vertical: 8, horizontal: 16 }}
      cornerRadius={8}
      onClick={login}
    >
      <Text fontSize={16} fill="#FFFFFF">
        Connect
      </Text>
    </AutoLayout>
  );
}
