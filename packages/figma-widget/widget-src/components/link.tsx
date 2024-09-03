import { Text } from '../lib/widget';

export const Link = ({
  children,
  ...props
}: TextChildren & AutoLayoutProps) => {
  return (
    <Text fill="#3b82f6" {...props}>
      {children}
    </Text>
  );
};
