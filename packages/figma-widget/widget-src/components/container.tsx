import { AutoLayout, Text } from '../lib/widget';
import { Divider } from './divider';
import { Link } from './link';

export const Container = ({ children, ...props }: AutoLayoutProps) => {
  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      width={450}
      fill="#FFFFFF"
      cornerRadius={8}
      // spacing={12}
      {...props}
    >
      <AutoLayout width="fill-parent" height={50} padding={16}>
        <Text fontWeight="bold">DS Pro</Text>
        <AutoLayout width="fill-parent" />
        <Link>Disconnect</Link>
      </AutoLayout>
      <Divider />
      {children}
      <Divider />
      <AutoLayout width="fill-parent" height={50} padding={16}>
        <Link>Feedback</Link>
        <AutoLayout width="fill-parent" />
      </AutoLayout>
    </AutoLayout>
  );
};
