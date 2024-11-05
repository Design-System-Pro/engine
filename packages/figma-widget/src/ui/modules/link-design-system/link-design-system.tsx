import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ds-project/components/client';
import { useCallback } from 'react';
import { useProjects } from '../providers/projects-provider';

export function LinkDesignSystem() {
  const {
    isLoading: isProjectsLoading,
    linkProject,
    projects,
    selectedProjectId,
  } = useProjects();

  const onValueChange = useCallback(
    (projectId: string) => {
      linkProject(projectId);
    },
    [linkProject]
  );

  return (
    <Select
      onValueChange={onValueChange}
      value={selectedProjectId ?? undefined}
    >
      <SelectTrigger className="max-w-[200px]">
        <SelectValue
          placeholder={isProjectsLoading ? 'Loading...' : 'Select a project'}
        />
      </SelectTrigger>
      <SelectContent>
        {projects?.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
