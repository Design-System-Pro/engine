import { AutoLayout, Text } from '../lib/widget';

export const Button = ({
  onClick,
  variant = 'default',
  children,
  ...props
}: TextChildren &
  AutoLayoutProps & {
    variant?: 'default' | 'outline';
  }) => {
  const styles: AutoLayoutProps = (() => {
    switch (variant) {
      case 'default':
        return {
          fill: '#0F172A',
          stroke: '#0F172A',
        };
      case 'outline':
        return {
          fill: '#00000000',
          stroke: '#f5f5f5',
          hoverStyle: {
            fill: '#f5f5f5',
          },
        };
    }
  })();

  return (
    <AutoLayout
      name="Button"
      onClick={onClick}
      cornerRadius={4}
      padding={{ vertical: 8, horizontal: 12 }}
      {...styles}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      {...props}
    >
      {typeof children === 'string' ? (
        <Text fontSize={14} fill={'#ffffff'} fontWeight="bold">
          {children}
        </Text>
      ) : (
        children
      )}
    </AutoLayout>
  );
};
