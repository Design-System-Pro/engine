import type { DesignToken } from 'style-dictionary/types';
import { extractModeVariable } from './extract-mode-variable';
import { nonNullable } from '../utils/non-nullable';
import { combinePaths } from '../utils/combine-paths';
import { getModeKey } from '../utils/get-mode-key';

export const extractVariable = async (
  variableId: string
): Promise<DesignToken | undefined> => {
  const variable = await figma.variables.getVariableByIdAsync(variableId);

  if (!variable) return undefined;

  const modeIds = Object.keys(variable.valuesByMode);
  const variableCollectionId = variable.variableCollectionId;

  const valuesPerMode = (
    await Promise.all(
      modeIds.map(async (modeId) => ({
        [await getModeKey({ variableCollectionId, modeId })]:
          await extractModeVariable(variable, modeId),
      }))
    )
  ).filter(nonNullable);

  return combinePaths(valuesPerMode);
};
