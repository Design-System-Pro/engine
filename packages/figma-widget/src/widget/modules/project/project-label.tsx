import { Button } from '../../components/button';
import { ProjectSelector } from '../../components/project';
import { Text } from '../../lib/widget';
import { useProjectActions } from './project.actions';

export function ProjectLabel() {
  const { selectProject, selectedProject } = useProjectActions();

  if (selectedProject) {
    return (
      <Button variant="ghost" onClick={selectProject}>
        <Text>{selectedProject.name}</Text>
      </Button>
    );
  }

  return (
    <ProjectSelector
      onProjectSelect={selectProject}
      selectedProject={selectedProject}
    />
  );
}
