import type { DesignTokens } from 'style-dictionary/types';
import { extractVariableCollection } from './extractors/variable-collection';
import { combinePaths } from './utils/combine-paths';

export async function extractDesignTokens(): Promise<DesignTokens> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  const localVariableCollections = await Promise.all(
    collections.map(extractVariableCollection)
  );

  return combinePaths(localVariableCollections);
}
