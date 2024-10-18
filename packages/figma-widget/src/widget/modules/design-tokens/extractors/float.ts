import type { Dimension, JSONTokenTree } from 'design-tokens-format-module';
import { extractAlias } from './extract-alias';
import { config } from '../../../config';
import { tokenizeVariable } from '../utils/tokenize-variable';

export async function extractFloat(
  variable: Variable,
  modeId: string
): Promise<JSONTokenTree> {
  const value = variable.valuesByMode[modeId];

  if (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'object' && 'b' in value)
  ) {
    // string | boolean | RGB | RGBA | VariableAlias
    // We should not receive these types under float. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected float type');
  }

  let floatOrAlias: Dimension.Value | undefined;

  if (typeof value === 'object' && 'id' in value) {
    floatOrAlias = await extractAlias(value.id, modeId);
  } else {
    floatOrAlias = `${value}px`;
  }

  // All scopes

  const token = {
    $type: 'dimension',
    $value: floatOrAlias,
    $extensions: {
      [config.extensionPluginKey]: {
        scopes: variable.scopes,
      },
    },
  } satisfies Dimension.Token;

  return tokenizeVariable(variable.name)(token);
}
