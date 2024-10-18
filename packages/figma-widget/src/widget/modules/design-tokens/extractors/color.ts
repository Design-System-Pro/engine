import type { Color, JSONTokenTree } from 'design-tokens-format-module';
import { extractAlias } from './extract-alias';
import { config } from '../../../config';
import { rgbToHex } from '../transformers/color';
import { tokenizeVariable } from '../utils/tokenize-variable';

export async function extractColor(
  variable: Variable,
  modeId: string
): Promise<JSONTokenTree> {
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

  let colorOrAlias: Color.Value | undefined;

  if ('a' in value || 'r' in value) {
    // RGB | RGBA
    colorOrAlias = rgbToHex(value);
  }

  if (typeof value === 'object' && 'id' in value) {
    // VariableAlias
    colorOrAlias = await extractAlias(value.id, modeId);
  }

  if (!colorOrAlias) {
    // We should not receive these types under color. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected color value');
  }

  const token = {
    $type: 'color',
    $value: colorOrAlias,
    $description: variable.description,
    $extensions: {
      [config.extensionPluginKey]: {
        scopes: variable.scopes,
      },
    },
  } satisfies Color.Token;

  return tokenizeVariable(variable.name)(token);
}
