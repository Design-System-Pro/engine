import { useCallback, useEffect, useState } from 'react';
import { useProjects } from '../providers/projects-provider';
import { once } from '@ds-project/figma-utilities';
import { Icons, Text } from '@ds-project/components/server';
import { Separator } from '@ds-project/components/client';

export function ProjectUI() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    isLoading: isProjectsLoading,
    linkProject,
    projects,
    selectedProjectId,
  } = useProjects();

  useEffect(() => {
    return once('set-project', () => {
      setIsVisible(true);
    });
  }, []);

  const onValueChange = useCallback(
    (projectId: string) => {
      linkProject(projectId);
    },
    [linkProject]
  );

  if (!isVisible) return null;

  if (isProjectsLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col p-2">
      <Text weight="bold" size="lg">
        <h1>Select project</h1>
      </Text>
      <ul>
        {projects?.map(({ id, name }, index) => (
          <li key={id}>
            <button
              onClick={() => onValueChange(id)}
              className="flex w-full items-center gap-4 rounded-md px-4 py-2 hover:bg-gray-100"
            >
              {selectedProjectId === id ? <Icons.CheckIcon /> : null}
              {name}
            </button>
            {index < projects.length - 1 ? <Separator /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
