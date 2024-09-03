import { AutoLayout, Text } from '../lib/widget';

export const Button = ({
  onClick,
  children,
  ...props
}: TextChildren & AutoLayoutProps) => {
  return (
    <AutoLayout
      onClick={onClick}
      fill={'#0F172A'}
      cornerRadius={4}
      padding={{ vertical: 8, horizontal: 12 }}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      {...props}
    >
      <Text fontSize={14} fill={'#ffffff'} fontWeight="bold">
        {children}
      </Text>
    </AutoLayout>
  );
};
