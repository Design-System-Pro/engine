import type { DesignTokens } from 'style-dictionary/types';
import * as R from 'rambda';
import { figmaVariable } from './transformers/figma-variable';

/**
 * Sizing
 * Spacing
 * Color
 * Border Radius
 * Border Width
 * Border
 * Opacity
 * Box Shadow
 * Typography
 * Font Family
 * Font Weight
 * Line Height
 * Font Size
 * Letter Spacing
 * Paragraph Spacing
 * Text Case
 * Text Decoration
 * Composition
 * Assets
 * Dimension
 * Boolean
 * Text
 * Number
 * Other
 */
export const getFigmaVariables = async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  const collectionVariablesPromises = collections.map(
    async (variableCollection) => {
      const variablePromises =
        variableCollection.variableIds.map(figmaVariable);

      const variables = await Promise.all(variablePromises);

      return variables;
    }
  );

  const collectionVariables = await Promise.all(collectionVariablesPromises);

  const flatCollection = collectionVariables
    .flat()
    // Filter out null values
    .filter(Boolean) as DesignTokens[];

  return R.reduce<DesignTokens, DesignTokens>(
    (accumulator, variable) => R.mergeDeepRight(accumulator, variable),
    {}
  )(flatCollection);
};
