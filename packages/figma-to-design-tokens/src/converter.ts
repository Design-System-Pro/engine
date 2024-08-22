import type { DesignToken, DesignTokens } from 'style-dictionary/types';
import type { FigmaExtractedVariableCollection } from './types/figma';
import { extractVariable } from './extractors/extract-variable';
import { notImplemented } from './filters/not-implemented';

export function convertFigmaVariablesToDesignTokens(
  variableCollections: FigmaExtractedVariableCollection[]
): DesignTokens {
  return {
    $type: 'figma-design-tokens',
    collections: variableCollections.flatMap<DesignTokens>((collection) => ({
      $type: 'collection',
      $description: 'Figma Variable Collections',
      attributes: {
        figma: {
          id: collection.id,
          key: collection.key,
          name: collection.name,
          hiddenFromPublishing: collection.hiddenFromPublishing,
          modes: collection.modes,
        },
      },
      ...collection.modes.reduce(
        (collectionModeVariables, mode) => ({
          ...collectionModeVariables,
          [mode.name]: {
            ...collection.variables.filter(notImplemented).reduce<DesignToken>(
              (variables, variable) => ({
                ...variables,
                [variable.name]: extractVariable(variable, mode.modeId),
              }),
              {}
            ),
          },
        }),
        {}
      ),
    })),
  };
}
