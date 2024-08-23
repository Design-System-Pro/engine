import type { DesignToken } from 'style-dictionary/types';
import { extractAlias } from './extract-alias';
import { tokenizeVariable } from '../utils/tokenize-variable';
import { config } from '../../config';
import { rgbToHex } from '../transformers';

export async function extractColor(
  variable: Variable,
  modeId: string
): Promise<DesignToken> {
  const value = variable.valuesByMode[modeId];

  if (
    !value ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    // We should not receive these types under color. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected color type');
  }

  let colorOrAlias: string | undefined;

  if ('a' in value || 'r' in value) {
    // RGB | RGBA
    colorOrAlias = rgbToHex(value);
  }

  if (typeof value === 'object' && 'id' in value) {
    // VariableAlias
    colorOrAlias = await extractAlias(value.id, modeId);
  }

  return tokenizeVariable(variable.name)({
    $type: 'color',
    $description: variable.description,
    $value: colorOrAlias,
    extensions: {
      [config.extensionPluginKey]: {
        scopes: variable.scopes,
      },
    },
  });
}
