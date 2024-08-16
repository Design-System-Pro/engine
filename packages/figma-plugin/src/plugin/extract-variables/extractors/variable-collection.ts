import { FigmaExtractedVariableCollection } from '@ds-project/types/src/types/figma';
import { nonNullable } from '../utils/non-nullable';
import { extractVariable } from './variable';

export const extractVariableCollection =
  (figma: PluginAPI) =>
  async (
    variableCollection: VariableCollection
  ): Promise<FigmaExtractedVariableCollection> => {
    const variables = (
      await Promise.all(
        variableCollection.variableIds.map(extractVariable(figma))
      )
    ).filter(nonNullable);

    return {
      defaultModeId: variableCollection.defaultModeId,
      hiddenFromPublishing: variableCollection.hiddenFromPublishing,
      id: variableCollection.id,
      key: variableCollection.key,
      modes: variableCollection.modes,
      name: variableCollection.name,
      remote: variableCollection.remote,
      variableIds: variableCollection.variableIds,
      variables,
    };
  };
