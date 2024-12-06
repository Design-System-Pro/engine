import type { ColorToken } from '@terrazzo/token-tools';
import { ExtendedToken } from '../types/tokens.type';
import { expandTokenName } from '../utils/expand-token-name';
import { assignAlias } from './alias';
import { assignScopes } from '../utils/assign-scopes';

export async function injectColor(
  extendedTokenName: string,
  token: ExtendedToken<ColorToken>
): Promise<void> {
  const {
    collectionName,
    modeName,
    tokenPath: tokenName,
  } = expandTokenName(extendedTokenName);

  const localVariableCollections =
    await figma.variables.getLocalVariableCollectionsAsync();
  let variableCollection = localVariableCollections.find(
    (collection) => collection.name === collectionName
  );

  if (!variableCollection) {
    variableCollection =
      figma.variables.createVariableCollection(collectionName);
  }
  const modeId = variableCollection.modes.find(
    (mode) => mode.name === modeName
  )?.modeId;

  if (!modeId) {
    throw new Error(
      `Mode ${modeName} not found in collection ${collectionName}`
    );
  }

  const localVariables = await figma.variables.getLocalVariablesAsync();
  let variable = localVariables.find((variable) => variable.name === tokenName);

  if (!variable) {
    variable = figma.variables.createVariable(
      tokenName,
      variableCollection,
      'COLOR'
    );
  }

  if (typeof token.$value === 'object' && token.$value.colorSpace === 'srgb') {
    variable.setValueForMode(modeId, {
      r: token.$value.channels[0],
      g: token.$value.channels[1],
      b: token.$value.channels[2],
      a: token.$value.alpha,
    });
  } else if (typeof token.$value === 'string') {
    assignAlias({ variable, modeId, token, localVariables });
  }

  assignScopes({ variable, token });
}
