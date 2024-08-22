import type { DesignTokens } from 'style-dictionary/types';
import { nonNullable } from '../utils/non-nullable';
import { extractVariable } from './extract-variable';
import { combinePaths } from '../utils/combine-paths';

export const extractVariableCollection = async (
  variableCollection: VariableCollection
): Promise<DesignTokens> => {
  const variables = (
    await Promise.all(variableCollection.variableIds.map(extractVariable))
  ).filter(nonNullable);

  return { [variableCollection.name]: combinePaths(variables) };
};
