import type { DesignTokens } from 'style-dictionary/types';
import { nonNullable } from '../utils/non-nullable';
import { extractVariable } from './extract-variable';

export const extractVariableCollection = async (
  variableCollection: VariableCollection
): Promise<DesignTokens> => {
  const variables = (
    await Promise.all(variableCollection.variableIds.map(extractVariable))
  ).filter(nonNullable);

  return {
    $type: 'figma-variable-collection',
    extensions: {
      defaultModeId: variableCollection.defaultModeId,
      hiddenFromPublishing: variableCollection.hiddenFromPublishing,
      id: variableCollection.id,
      key: variableCollection.key,
      modes: variableCollection.modes,
      name: variableCollection.name,
      remote: variableCollection.remote,
      variableIds: variableCollection.variableIds,
    },
    variables,
  };
};
