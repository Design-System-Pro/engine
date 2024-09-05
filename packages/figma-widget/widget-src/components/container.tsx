import { AutoLayout, Text } from '../lib/widget';
import { ConnectButton } from '../modules/connect-button';
import { Divider } from './divider';
import { Link } from './link';

export const Container = ({ children, ...props }: AutoLayoutProps) => {
  return (
    <AutoLayout
      name="Container"
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      width={450}
      fill="#FFFFFF"
      cornerRadius={8}
      {...props}
    >
      <AutoLayout
        name="Header"
        width="fill-parent"
        height="hug-contents"
        direction="horizontal"
        verticalAlignItems="center"
        padding={16}
        spacing={4}
      >
        <AutoLayout
          name="Brand-Project"
          direction="horizontal"
          spacing={4}
          verticalAlignItems="center"
        >
          <Text fontWeight="bold">DS Pro</Text>
          <Text>•</Text>
          <Text fontWeight="light">@project-name</Text>
        </AutoLayout>

        <AutoLayout width="fill-parent" height={1} />

        <ConnectButton />
      </AutoLayout>
      <Divider />
      <AutoLayout
        width="fill-parent"
        height="hug-contents"
        padding={16}
        verticalAlignItems="center"
        horizontalAlignItems="center"
      >
        {children}
      </AutoLayout>
      <Divider />
      <AutoLayout
        name="Footer"
        width="fill-parent"
        height="hug-contents"
        verticalAlignItems="center"
        padding={16}
      >
        <Link href="https://ds-project.supahub.com">Feedback</Link>
        <AutoLayout width="fill-parent" height={1} />
      </AutoLayout>
    </AutoLayout>
  );
};
