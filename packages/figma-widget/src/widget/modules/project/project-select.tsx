import { Button } from '../../components/button';
import { caretIcon } from '../../icons/caret';
import { AutoLayout, SVG, Text } from '../../lib/widget';
import { useProjectActions } from './project.actions';

export function ProjectSelect() {
  const { selectProject, selectedProject, isReady } = useProjectActions();

  if (!isReady) {
    return null;
  }

  if (selectedProject) {
    return (
      <Button variant="ghost" onClick={selectProject}>
        <Text>{selectedProject.name}</Text>
      </Button>
    );
  }

  return (
    <Button variant="ghost" onClick={selectProject}>
      <AutoLayout spacing={8}>
        <Text fontSize={16}>Select Project</Text>
        <SVG src={caretIcon} width={16} height={16} />
      </AutoLayout>
    </Button>
  );
}
