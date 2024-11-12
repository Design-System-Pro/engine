import { combinePaths } from './utils/combine-paths';
import { extractVariableCollection } from './extractors/variable-collection';
import { extractTextStyle } from './extractors/text-style';
import { extractEffectStyle } from './extractors/effect-style';
import type { Group } from '@terrazzo/token-tools';

export async function extractDesignTokens(): Promise<Group> {
  const variableCollections =
    await figma.variables.getLocalVariableCollectionsAsync();

  const localVariableCollections = await Promise.all(
    variableCollections.map(extractVariableCollection)
  );

  const textStyles = await figma.getLocalTextStylesAsync();
  const localTextStyles = await Promise.all(textStyles.map(extractTextStyle));

  const effectStyles = await figma.getLocalEffectStylesAsync();
  const localEffectStyles = await Promise.all(
    effectStyles.map(extractEffectStyle)
  );

  return combinePaths([
    ...localVariableCollections,
    ...localTextStyles,
    ...localEffectStyles,
  ]);
}
