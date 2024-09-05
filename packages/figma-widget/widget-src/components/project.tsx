import { caretIcon } from '../icons/caret';
import { AutoLayout, SVG, Text } from '../lib/widget';

interface ProjectSelectorProps {
  selectedProject?: string;
  onProjectSelect: () => void;
}

export function ProjectSelector({
  selectedProject,
  onProjectSelect,
}: ProjectSelectorProps) {
  return (
    <AutoLayout
      name="ProjectSelector"
      direction="horizontal"
      verticalAlignItems="center"
      width="fill-parent"
      height={40}
      spacing={8}
      padding={{ left: 16, right: 12, top: 8, bottom: 8 }}
      cornerRadius={8}
      fill="#FFFFFF"
      stroke="#E6E6E6"
      onClick={onProjectSelect}
    >
      <Text fontSize={14} width="fill-parent" fontWeight="medium">
        {selectedProject ?? 'Select a project'}
      </Text>

      <SVG src={caretIcon} width={16} height={16} />
    </AutoLayout>
  );
}
