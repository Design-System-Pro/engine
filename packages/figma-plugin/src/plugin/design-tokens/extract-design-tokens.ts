import type { DesignTokens } from 'style-dictionary/types';
import { extractVariableCollection } from './extractors/variable-collection';

export async function extractDesignTokens(): Promise<DesignTokens> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  const localVariableCollections = await Promise.all(
    collections.map(extractVariableCollection)
  );

  return {
    $type: 'figma-design-tokens',
    localVariableCollections,
  };
}
