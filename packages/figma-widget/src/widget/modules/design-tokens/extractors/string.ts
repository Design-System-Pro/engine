import { extractAlias } from './alias';
import { config } from '../../../config';
import { tokenizeVariable } from '../utils/tokenize-variable';
import type {
  FontFamilyToken,
  FontWeightToken,
  Group,
} from '@terrazzo/token-tools';

export async function extractString(
  variable: Variable,
  modeId: string
): Promise<Group> {
  const value = variable.valuesByMode[modeId];

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    (typeof value === 'object' && 'b' in value)
  ) {
    // number | boolean | RGB | RGBA | VariableAlias
    // We should not receive these types under string. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected string type');
  }

  let stringOrAlias;

  if (typeof value === 'object' && 'id' in value) {
    stringOrAlias = await extractAlias(value.id, modeId);
  } else {
    stringOrAlias = value;
  }

  if (!stringOrAlias) {
    // We should not receive these types under string. If that happens, something went wrong during the extraction from Figma.
    throw new Error('Unexpected string value');
  }

  if (variable.scopes.includes('FONT_FAMILY')) {
    let $value: string; // Or AliasValue, but since both are strings, typescript is not able to assert this

    if (typeof value === 'object' && 'id' in value) {
      $value = await extractAlias(value.id, modeId);
    } else {
      $value = value;
    }

    return tokenizeVariable(variable.name)({
      $type: 'fontFamily',
      $value,
      $description: variable.description,
      $extensions: {
        [config.extensionPluginKey]: {
          scopes: variable.scopes,
        },
      },
    } satisfies FontFamilyToken);
  }

  if (
    variable.scopes.includes('FONT_WEIGHT') ||
    variable.scopes.includes('FONT_STYLE')
  ) {
    let $value: FontWeightToken['$value'];

    if (typeof value === 'object' && 'id' in value) {
      $value = await extractAlias(value.id, modeId);
    } else {
      $value = value;
    }

    return tokenizeVariable(variable.name)({
      $type: 'fontWeight',
      $value,
      $description: variable.description,
      $extensions: {
        [config.extensionPluginKey]: {
          scopes: variable.scopes,
        },
      },
    } satisfies FontWeightToken);
  }

  // Any other scope by default will be ignored

  return {};
}
