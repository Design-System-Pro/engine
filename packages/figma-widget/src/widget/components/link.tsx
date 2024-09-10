import { externalLinkIcon } from '../icons/external-link';
import { AutoLayout, SVG, Text } from '../lib/widget';

export interface LinkProps extends TextChildren, TextProps {}

export const Link = ({ children, onClick, ...props }: LinkProps) => {
  return (
    <AutoLayout
      name="Link"
      onClick={onClick}
      direction="horizontal"
      padding={{ vertical: 8, horizontal: 12 }}
      spacing={4}
      verticalAlignItems="center"
      cornerRadius={4}
      hoverStyle={{
        fill: '#f5f5f5',
      }}
    >
      <Text fill="#3b82f6" {...props}>
        {children}
      </Text>
      {props.href ? <SVG src={externalLinkIcon} /> : null}
    </AutoLayout>
  );
};
