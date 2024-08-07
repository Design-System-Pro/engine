import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ds-project/components';
import { useCallback, useEffect, useState } from 'react';
import { useDS } from '../providers/ds-provider';
import { AsyncMessage } from '../../../message';
import { AsyncMessageTypes } from '../../../message.types';
import { useConfig } from '../providers/config-provider';

export function LinkDesignSystem() {
  const [designSystems, setDesignSystems] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedDesignSystemId, setSelectedDesignSystemId] =
    useState<string>();
  const { api, state } = useDS();
  const { fileName } = useConfig();

  useEffect(() => {
    AsyncMessage.ui
      .request({
        type: AsyncMessageTypes.GetDesignSystem,
      })
      .then(({ designSystemId }) => {
        if (!designSystemId) return;
        setSelectedDesignSystemId(designSystemId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design system from plugin', error);
      });
  }, []);

  useEffect(() => {
    if (state !== 'authenticated') return;

    api
      .getDesignSystems()
      .then((data) => {
        setDesignSystems(data.designSystems);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error('Error fetching design systems', error);
      });
  }, [api, state]);

  const onValueChange = useCallback(
    (designSystemId: string) => {
      if (!fileName) {
        // eslint-disable-next-line no-console -- TODO: replace with monitoring
        console.error(
          'Unable to link to design system. File name is not available.'
        );
        return;
      }
      void api.linkDesignSystem({ designSystemId, fileName });
      void AsyncMessage.ui.request({
        type: AsyncMessageTypes.SetDesignSystem,
        designSystemId,
      });
    },
    [api, fileName]
  );

  return (
    <Select onValueChange={onValueChange} value={selectedDesignSystemId}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder="Select a design system" />
      </SelectTrigger>
      <SelectContent>
        {designSystems.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
