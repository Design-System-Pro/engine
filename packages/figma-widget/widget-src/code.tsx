import { Button } from "./components/button";

const { widget } = figma;
const { AutoLayout, Text } = widget;

function Widget() {
  return (
    <AutoLayout
      direction="vertical"
      fill="#FFFFFF"
      cornerRadius={8}
      padding={16}
      width={300}
      height={200}
      verticalAlignItems="center"
      spacing={16}
    >
      <Text fontSize={24} fontWeight="bold">
        DS Pro
      </Text>

      <Button>Connect with DS Pro</Button>

      <AutoLayout verticalAlignItems="baseline" height="fill-parent">
        <Text
          fontSize={12}
          fill="#0E1739"
          href="https://designsystemproject.pro"
        >
          Learn more about DS Pro
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}
widget.register(Widget);
