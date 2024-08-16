import { FigmaExtractedVariable } from '@ds-project/types/src/types/figma';

export const extractVariable =
  (figma: PluginAPI) =>
  async (variableId: string): Promise<FigmaExtractedVariable | undefined> => {
    const variable = await figma.variables.getVariableByIdAsync(variableId);

    if (!variable) {
      return undefined;
    }

    const publishStatus = await variable?.getPublishStatusAsync();

    return {
      publishStatus: publishStatus,
      description: variable.description,
      hiddenFromPublishing: variable.hiddenFromPublishing,
      name: variable.name,
      resolvedType: variable.resolvedType,
      valuesByMode: variable.valuesByMode,
      id: variable.id,
      key: variable.key,
      remote: variable.remote,
      scopes: variable.scopes,
      variableCollectionId: variable.variableCollectionId,
    };
  };
