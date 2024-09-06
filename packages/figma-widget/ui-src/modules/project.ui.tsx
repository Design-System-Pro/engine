import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ds-project/components';
import { useCallback, useEffect, useState } from 'react';
import { Message, MessageType } from '@ds-project/figma-messaging';
import { useProjects } from './providers/projects-provider';

export function Project() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    isLoading: isProjectsLoading,
    linkProject,
    projects,
    selectedProjectId,
  } = useProjects();

  useEffect(() => {
    Message.ui.handle(MessageType.OpenLinkProject, () => {
      setIsVisible(true);
      return Promise.resolve({});
    });
  });

  const onValueChange = useCallback(
    (projectId: string) => {
      linkProject(projectId);
    },
    [linkProject]
  );

  if (!isVisible) return null;

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
