import type { DesignToken } from 'style-dictionary/types';
import { tokenize } from '../utils/tokenize';
import { extractAlias } from './extract-alias';
import { config } from '../../config';

export async function extractFloat(
  variable: Variable,
  modeId: string
): Promise<DesignToken> {
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

  let floatOrAlias: number | string | undefined;

  if (typeof value === 'object' && 'id' in value) {
    floatOrAlias = await extractAlias(value.id, modeId);
  } else {
    floatOrAlias = value;
  }

  // All scopes

  return tokenize(
    modeId,
    variable.name
  )({
    $type: 'dimension',
    $value: floatOrAlias,
    extensions: {
      [config.extensionPluginKey]: {
        scopes: variable.scopes,
      },
    },
  });
}
