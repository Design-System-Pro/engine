import { nonNullable } from '../utils/non-nullable';
import { extractVariable } from './variable';
import { combinePaths } from '../utils/combine-paths';
import type { Group } from '@terrazzo/token-tools';

export const extractVariableCollection = async (
  variableCollection: VariableCollection
): Promise<Group> => {
  const variables = (
    await Promise.all(variableCollection.variableIds.map(extractVariable))
  ).filter(nonNullable);

  return { [variableCollection.name]: combinePaths(variables) };
};
