import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { api } from '@ds-project/api/react';
import { useConfig } from './config-provider';
import type { SelectProjects } from '../../../../../database/src/schema/projects';
import { emit } from '@ds-project/figma-utilities';
import { useAuth } from './auth-provider';

interface ContextType {
  selectedProjectId: string | null;
  linkProject: (projectId: string) => void;
  projects?: Pick<SelectProjects, 'id' | 'name'>[];
  isLoading: boolean;
}

const Context = createContext<ContextType>({
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  linkProject: () => {},
  selectedProjectId: null,
  projects: undefined,
});

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const { fileName, projectId: defaultProjectId } = useConfig();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    defaultProjectId
  );
  const { state } = useAuth();
  const { data: projects, isLoading: isProjectsLoading } =
    api.projects.getAll.useQuery(undefined, {
      enabled: state === 'authorized',
    });

  const { mutateAsync: linkResource } =
    api.resources.linkToProject.useMutation();

  const linkProject = useCallback(
    async (projectId: string) => {
      const linkedProjectName = projects?.find(
        (project) => project.id === projectId
      )?.name;
      if (!linkedProjectName || !fileName) return;

      try {
        await linkResource({ projectId, name: fileName });

        setSelectedProjectId(projectId);
        return emit('set-project', { id: projectId, name: linkedProjectName });
      } catch (error) {
        console.error('Error linking project', { error });
      }
    },
    [fileName, linkResource, projects]
  );

  const value = useMemo(
    () => ({
      linkProject,
      selectedProjectId,
      isLoading: isProjectsLoading,
      projects: projects?.map(({ id, name }) => ({ id, name })),
    }),
    [linkProject, selectedProjectId, isProjectsLoading, projects]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useProjects() {
  const context = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- If provider is not available, this will be undefined
  if (!context) {
    throw new Error('useProject should be used within <ProjectProvider>');
  }

  return context;
}
