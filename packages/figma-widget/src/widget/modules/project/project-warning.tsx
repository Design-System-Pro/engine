import { Text } from '../../lib/widget';
import { useProjectActions } from './project.actions';

export function ProjectWarning() {
  const { selectedProject, isReady } = useProjectActions();

  if (!isReady) {
    // Project is not ready to be selected
    return null;
  }

  if (selectedProject) {
    // Project has been selected
    return null;
  }

  // Project is ready to be selected
  return (
    <Text fontSize={14} fill="#808080">
      ☝️ Select a project to get started
    </Text>
  );
}
