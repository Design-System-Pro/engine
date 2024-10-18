import type { JSONTokenTree } from 'design-tokens-format-module';
import { combinePaths } from './utils/combine-paths';
import { extractVariableCollection } from './extractors/variable-collection';

export async function extractDesignTokens(): Promise<JSONTokenTree> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  const localVariableCollections = await Promise.all(
    collections.map(extractVariableCollection)
  );

  return combinePaths(localVariableCollections);
}
