import { AutoLayout, Text } from '../lib/widget';

export const Button = ({
  onClick,
  variant = 'default',
  children,
  ...props
}: TextChildren &
  AutoLayoutProps & {
    variant?: 'default' | 'outline' | 'ghost';
  }) => {
  const styles: {
    textStyles: TextProps;
    wrapperStyles: AutoLayoutProps;
  } = (() => {
    switch (variant) {
      case 'default':
        return {
          textStyles: {
            fill: '#ffffff',
          },
          wrapperStyles: {
            fill: '#0F172A',
            stroke: '#0F172A',
          },
        };
      case 'outline':
        return {
          textStyles: {
            fill: '#ffffff',
          },
          wrapperStyles: {
            fill: '#00000000',
            stroke: '#f5f5f5',
            hoverStyle: {
              fill: '#f5f5f5',
            },
          },
        };
      case 'ghost':
        return {
          textStyles: {
            fill: '#000000',
            fontSize: 14,
            fontWeight: 'medium',
          },
          wrapperStyles: {
            fill: '#00000000',
            stroke: '#f5f5f500',
            hoverStyle: {
              fill: '#f5f5f5',
            },
          },
        };
    }
  })();

  console.log({ type: typeof children, children });

  return (
    <AutoLayout
      name="Button"
      onClick={onClick}
      cornerRadius={4}
      padding={{ vertical: 8, horizontal: 12 }}
      {...styles.wrapperStyles}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      {...props}
    >
      {typeof children === 'object' &&
      Array.isArray(children) &&
      typeof children[0] === 'string' ? (
        <Text {...styles.textStyles}>{children}</Text>
      ) : (
        children
      )}
    </AutoLayout>
  );
};
