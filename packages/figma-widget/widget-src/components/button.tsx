
const { widget } = figma;
const { Text, AutoLayout } = widget;

export function Button({ children }: TextChildren) {

  return (
    <AutoLayout
      fill="#0E1739"
      padding={{ vertical: 8, horizontal: 16 }}
      cornerRadius={8}
    >
      <Text fontSize={16} fill="#FFFFFF">
        {children}
      </Text>
    </AutoLayout>
  );
}
