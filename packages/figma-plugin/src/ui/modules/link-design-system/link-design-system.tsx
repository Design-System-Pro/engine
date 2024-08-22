import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ds-project/components';
import { useCallback, useEffect, useState } from 'react';
import { AsyncMessage } from '../../../message';
import { AsyncMessageTypes } from '../../../message.types';
import { useConfig } from '../providers/config-provider';
import { api } from '@ds-project/api/react';

export function LinkDesignSystem() {
  const { fileName } = useConfig();
  const [selectedProjectId, setSelectedProjectId] = useState<string>();
  const { data: projects, isLoading: isProjectsLoading } =
    api.projects.account.useQuery();
  const { mutate: linkResource } = api.resources.link.useMutation();

  useEffect(() => {
    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetProjectId,
      })
      .then(({ projectId }) => {
        if (!projectId) return;
        setSelectedProjectId(projectId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design system from plugin', error);
      });
  }, []);

  const onValueChange = useCallback((projectId: string) => {
    if (projectId && fileName) {
      linkResource({ projectId, name: fileName });
    }
    void AsyncMessage.ui.request({
      type: AsyncMessageTypes.SetProjectId,
      projectId,
    });
  }, []);

  return (
    <Select onValueChange={onValueChange} value={selectedProjectId}>
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
